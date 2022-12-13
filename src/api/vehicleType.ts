import { request } from '@/utils/axios'
// 车辆
// 车辆列表
export function vehicleTypeList() {
	return request.instance({
		url: '/VehicleType/list',
		method: 'get'
	})
}

// 车辆获分页取
export function vehicleTypePageList(params?: any) {
	return request.instance({
		url: '/VehicleType/pagelist',
		method: 'get',
		params
	})
}

// 车辆添加
export function addVehicleType(data: any) {
	return request.instance({
		url: '/VehicleType/create',
		method: 'post',
		data
	})
}

// 车辆修改
export function editVehicleType(data: any) {
	return request.instance({
		url: '/VehicleType/update',
		method: 'post',
		data
	})
}

// 车辆删除
export function deleteVehicleType(id: string) {
	return request.instance({
		url: `/VehicleType/delete/${id}`,
		method: 'post'
	})
}
