import { request } from '@/utils/axios'
// 匝道
// 匝道列表
export function rampList() {
	return request.instance({
		url: '/Ramp/list',
		method: 'get'
	})
}

// 匝道获分页取
export function rampPageList(params?: any) {
	return request.instance({
		url: '/Ramp/pagelist',
		method: 'get',
		params
	})
}

// 根据节点获取匝道
export function rampListByNode(params?: any) {
	return request.instance({
		url: '/Ramp/listByNode',
		method: 'get',
		params
	})
}

// 匝道添加
// export function addRamp(data: any) {
// 	return request.instance({
// 		url: '/Ramp/create',
// 		method: 'post',
// 		data
// 	})
// }

// 匝道修改
export function editRamp(data: any) {
	return request.instance({
		url: '/Ramp/update',
		method: 'post',
		data
	})
}
