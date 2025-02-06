import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint'
import autoprefixer from 'autoprefixer'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
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
  base: 'pokesleepcalc/',
  resolve: {
    alias: [{
      find: '@',
      replacement: './src'
    }]
  },
  // 生产环境移除console
  build: {
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
          } else if (id.includes('config')) {
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
