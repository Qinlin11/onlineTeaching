import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import viteCompression from 'vite-plugin-compression'


// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        AutoImport({
            resolvers: [ElementPlusResolver(),// 自动导入图标组件
                IconsResolver({
                    prefix: 'Icon'
                })],
            imports: ['vue', 'vue-router', 'pinia'],
            eslintrc: {
                enabled: true, // 默认false, true启用。生成一次就可以，避免每次工程启动都生成
                filepath: './.eslintrc-auto-import.json', // 生成json文件
                globalsPropValue: true,
            },
        }),
        Components({
            resolvers: [ElementPlusResolver({ importStyle: 'sass' }), // 自动导入图标组件
                IconsResolver({
                    enabledCollections: ['ep']
                })],
        }),
        // 自动导入图标组件
        Icons({
            autoInstall: true,
        }),
        viteCompression({
            filter: /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i, // 需要压缩的文件
            threshold: 1024, // 文件容量大于这个值进行压缩
            algorithm: 'gzip', // 压缩方式
            ext: 'gz', // 后缀名
            deleteOriginFile: true, // 压缩后是否删除压缩源文件
        })
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    server: {
        host: '0.0.0.0',
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:8000/api', // 后端服务的地址
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ''),
                secure: false,
            },
        },
    },
})


