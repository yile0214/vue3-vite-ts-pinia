import { request } from '@/utils/axios'
// 应用
// 应用获取
export function appList() {
	return request.instance({
		url: '/App/list',
		method: 'get'
	})
}

// 应用获分页取
export function appPageList(params) {
	return request.instance({
		url: '/App/pagelist',
		method: 'get',
		params
	})
}

// 应用添加
export function addApp(data) {
	return request.instance({
		url: '/App/create',
		method: 'post',
		data
	})
}

// 应用修改
export function editApp(data) {
	return request.instance({
		url: '/App/update',
		method: 'post',
		data
	})
}

// 应用删除
export function deleteApp(id) {
	return request.instance({
		url: `/App/delete/${id}`,
		method: 'post'
	})
}
