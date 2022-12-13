import { request } from '@/utils/axios'
// 费率计算
// 费率计算列表
export function routeList() {
	return request.instance({
		url: '/Route/list',
		method: 'get'
	})
}

// 费率计算获分页
export function routePageList(params?: any) {
	return request.instance({
		url: '/Route/pagelist',
		method: 'get',
		params
	})
}

// 费率计算添加
export function addRoute(data: any) {
	return request.instance({
		url: '/Route/create',
		method: 'post',
		data
	})
}

// 费率计算修改
export function editRoute(data: any) {
	return request.instance({
		url: '/Route/update',
		method: 'post',
		data
	})
}

// 费率计算删除
export function deleteRoute(id: string) {
	return request.instance({
		url: `/Route/delete/${id}`,
		method: 'post'
	})
}

// 计算费率
export function calcRoute(data: any) {
	return request.instance({
		url: `/Route/calc`,
		method: 'post',
		data
	})
}
