import { request } from '@/utils/axios'
// 省份
// 省份列表
export function provinceList() {
	return request.instance({
		url: '/Province/list',
		method: 'get'
	})
}

// 省份获分页取
export function provincePageList(params?: any) {
	return request.instance({
		url: '/Province/pagelist',
		method: 'get',
		params
	})
}

// 省份添加
export function addProvince(data: any) {
	return request.instance({
		url: '/Province/create',
		method: 'post',
		data
	})
}

// 省份修改
export function editProvince(data: any) {
	return request.instance({
		url: '/Province/update',
		method: 'post',
		data
	})
}

// 省份删除
export function deleteProvince(id: string) {
	return request.instance({
		url: `/Province/delete/${id}`,
		method: 'post'
	})
}
