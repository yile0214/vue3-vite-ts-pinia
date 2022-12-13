import { request } from '@/utils/axios'
// 公司
// 公司列表
export function companyList(params?: any) {
	return request.instance({
		url: '/Company/list',
		method: 'get',
		params
	})
}

// 公司获分页取
export function companyPageList(params?: any) {
	return request.instance({
		url: '/Company/pagelist',
		method: 'get',
		params
	})
}

// 公司添加
export function addCompany(data: any) {
	return request.instance({
		url: '/Company/create',
		method: 'post',
		data
	})
}

// 公司修改
export function editCompany(data: any) {
	return request.instance({
		url: '/Company/update',
		method: 'post',
		data
	})
}

// 公司删除
export function deleteCompany(id: string) {
	return request.instance({
		url: `/Company/delete/${id}`,
		method: 'post'
	})
}
