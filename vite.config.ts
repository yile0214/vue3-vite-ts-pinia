import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
const pathResolve = (dir: string) => resolve(__dirname, dir)
// https://vitejs.dev/config/
export default defineConfig({
	base: './',
	plugins: [
		vue(),
		AutoImport({
			resolvers: [ElementPlusResolver()]
		}),
		Components({
			resolvers: [ElementPlusResolver()]
		}),
		vueJsx(),
		createSvgIconsPlugin({
			// config svg dir that can config multi
			iconDirs: [resolve(process.cwd(), 'src/icons/common'), resolve(process.cwd(), 'src/icons/nav-bar')],
			// appoint svg icon using mode
			symbolId: 'icon-[dir]-[name]'
		})
	],
	server: {
		port: 9528,
		open: true,
		cors: true,
		host: '0.0.0.0',
		proxy: {
			'/api': {
				target: '', // 后台服务地址
				changeOrigin: true, // 是否允许跨源
				secure: false, // 支持https
				rewrite: path => path.replace(/^api/, '')
			}
		}
	},
	resolve: {
		alias: {
			'@': pathResolve('./src'),
			'~': pathResolve('./typings'),
			path: 'path-browserify' // 解决ts中无法引入path问题
		}
	},
	build: {
		// minify: 'terser',
		outDir: 'dist', // 打包指定路径，默认项目根目录下的dist目录
		terserOptions: {
			compress: {
				keep_infinity: true, //防止infinity被压缩成1/0,这可能会导致chrome上的性能问题
				drop_console: true, // 生产环境去除console.log
				drop_debugger: true // 生产环境去除debugger
			}
		},
		chunkSizeWarningLimit: 1500 // chunk大小警告限制
	}
})
