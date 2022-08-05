import type { AxiosRequestConfig, AxiosResponse } from 'axios'
export interface RequestInterceptors {
	// 请求拦截
	requestInterceptors?: (config: AxiosRequestConfig) => AxiosRequestConfig
	requestInterceptorsCatch?: (err: any) => any
	// 响应拦截
	responseInterceptors?: (config: AxiosResponse) => AxiosResponse
	responseInterceptorsCatch?: (err: any) => any
}
interface objAll {
	[propName: string]: any
}
// 自定义参数传入
export interface RequestConfig extends AxiosRequestConfig {
	headers?: objAll
	interceptors?: RequestInterceptors
}
