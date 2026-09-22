import path from 'path'
import fs from 'fs'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint'
import autoprefixer from 'autoprefixer'
import { LANG_PREFIXES, pageRouteMeta } from './src/config/routeData.js'

const BASE = 'pokesleepcalc/'

/**
 * 构建后为每个路由生成真实存在的静态入口页（如 zh/sleepcalc/index.html）
 * 目的：让 /pokesleepcalc/zh/xxx 直接命中磁盘文件，避免主机反爬模块对「不存在的路径」插入 JS 验证页；
 *      刷新与直链也不再依赖 .htaccess 重写（.htaccess 保留，用于兜底未知路径）
 * 前提：base 为以 / 开头的绝对路径，产物内的资源引用均为根绝对路径，故深层目录副本无需改写路径
 */
function spaStaticPages() {
  let outDir = ''
  let logger = console
  return {
    name: 'spa-static-pages',
    apply: 'build',
    configResolved(config) {
      outDir = path.resolve(config.root, config.build.outDir)
      logger = config.logger
    },
    closeBundle() {
      // 页面 path 与语言前缀均取自 src/config/routeData.js（与路由表同一数据源）
      const pages = pageRouteMeta.map(r => r.path)
      if (!pages.length) throw new Error('[spa-static-pages] pageRouteMeta 为空，请检查 src/config/routeData.js')
      const template = fs.readFileSync(path.join(outDir, 'index.html'), 'utf-8')
      const dirs = [...LANG_PREFIXES, ...LANG_PREFIXES.flatMap(lang => pages.map(page => `${lang}/${page}`))]
      dirs.forEach(dir => {
        fs.mkdirSync(path.join(outDir, dir), { recursive: true })
        fs.writeFileSync(path.join(outDir, dir, 'index.html'), template)
      })
      logger.info(`[spa-static-pages] 已生成 ${dirs.length} 个静态入口页：${dirs.join('、')}`)
    }
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  base: BASE,
  plugins: [
    vue(),
    spaStaticPages(),
    {
      name: 'spa-history-fallback',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (
            req.method === 'GET' &&
            req.headers.accept &&
            req.headers.accept.includes('text/html') &&
            !req.url.match(/\.\w+($|\?)/) &&
            !req.url.endsWith('index.html')
          ) {
            const htmlPath = path.resolve(process.cwd(), 'index.html')
            const html = fs.readFileSync(htmlPath, 'utf-8')
            server.transformIndexHtml(req.url, html).then(processed => {
              res.setHeader('Content-Type', 'text/html')
              res.end(processed)
            }).catch(() => next())
            return
          }
          next()
        })
      }
    },
    eslintPlugin({
      include: ['src/**/*.js', 'src/**/*.vue', 'src/*.js', 'src/*.vue']
    })
  ],
  css: {
    postcss: {
      plugins: [
        autoprefixer({
          overrideBrowserslist: [
            'ie >= 11',
            'Android >= 5',
            'iOS >= 9'
          ],
          grid: true
        })
      ]
    }
  },
  server: {
    port: 3229,
    cros: true,
    open: true
  },
  resolve: {
    alias: [{
      find: '@',
      replacement: path.resolve(process.cwd(), 'src')
    }]
  },
  // 生产环境移除console
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'node_lib'
          } else if (id.includes('i18n')) {
            return 'lang'
          } else if (id.includes('echart')) {
            return 'lib_echart'
          } else if (id.includes('config/sleepStyle.js') || id.includes('config/pokedex.js') || id.includes('config/spo.js')) {
            return 'pokedex'
          } else if (id.includes('config/masterRes')) {
            return 'masterRes'
          } else if (id.includes('components/DialogUpdateLog/data.js')) {
            return 'update'
          } else if (id.includes('components/SvgIcon/IconItem.vue')) {
            return 'svg-icon'
          } else if (id.includes('config') && !id.includes('config/uiIcons.js')) {
            return 'config'
          } else if (id.includes('pages/SleepCalc.vue')) {
            return 'sleepcalc'
          } else {
            return 'main'
          }
        }
      }
    }
  }
})
