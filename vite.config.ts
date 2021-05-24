import { ConfigEnv, UserConfig } from 'vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { join, resolve } from 'path'

// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv): UserConfig => {
  console.log(mode)
  const isLib = mode === 'lib'

  return {
    base: isLib ? '/' : '/toy-sheet/',
    plugins: [vueJsx()],
    resolve: {
      alias: {
        '@': join(__dirname, './src')
      }
    },
    build: isLib
      ? {
          lib: {
            entry: resolve(__dirname, './src/index.ts'),
            name: 'toy-sheet'

          },
          outDir: 'lib',
          rollupOptions: {
            external: ['vue'],
            output: {
              globals: {
                vue: 'Vue'
              }
            }
          }
        }
      : {}
  }
}
