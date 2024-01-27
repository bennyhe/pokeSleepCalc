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
          } else if (id.includes('config')) {
            return 'config'
          } else {
            return 'main'
          }
        }
      }
    }
  }
})
