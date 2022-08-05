import axios from 'axios'
import { AxiosInstance, AxiosResponse } from 'axios'
import { RequestConfig, RequestInterceptors } from '~/axios'
import { getToken } from '@/utils/auth'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useUserStore } from '@/store/user'
const userStore = useUserStore()
class Request {
	// axios实例
	instance: AxiosInstance
	constructor(config: RequestConfig) {
		console.log(config, 'config')
		this.instance = axios.create(config)
		this.instance.interceptors.request.use(
			(res: RequestConfig) => {
				console.log('全局拦截器', res, 'resss')
				// if (getToken()) {
				// res.headers['Authorization'] = 'Token_13675661606_8cc6f021c8af4319b70e378098af6442'
				// }
				return res
			},
			(err: any) => {
				// do something with request error
				return Promise.reject(err)
			}
		)
		this.instance.interceptors.response.use(
			(response: AxiosResponse) => {
				console.log('响应拦截器')
				const res = response.data
				console.log(res, '响应拦截器res')
				if (res.code !== 0) {
					ElMessage({
						message: res.result || 'Error',
						type: 'error',
						duration: 5 * 1000
					})
					if (res.code === 11) {
						// to re-login
						ElMessageBox.confirm('登录失效，请重新登录', '确定退出登录', {
							confirmButtonText: '重新登陆',
							cancelButtonText: '取消',
							type: 'warning'
						}).then(() => {
							userStore.resetState().then(() => {
								location.reload()
							})
						})
					}
					return Promise.reject(new Error(res.result || 'Error'))
				} else {
					return res.data
				}
			},
			(err: any) => {
				console.log(err, 'err')
			}
		)
	}
	request(config: RequestConfig) {
		return this.instance.request(config)
	}
}
export default Request
export const resuest = new Request({
	baseURL: import.meta.env.VITE_APP_BASE_URL,
	timeout: 30000
})
