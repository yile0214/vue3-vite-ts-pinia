import { resuest } from '@/utils/axios'
// 获取角色树
export function roleList(appId) {
	return resuest.instance({
		url: `/UserRole/listByApp/${appId}`,
		method: 'get'
	})
}

// 添加角色
export function addRole(data) {
	return resuest.instance({
		url: '/UserRole/create',
		method: 'post',
		data
	})
}

// 修改角色
export function editRole(data) {
	return resuest.instance({
		url: '/UserRole/update',
		method: 'post',
		data
	})
}

// 删除角色
export function deleteUserRole(id) {
	return resuest.instance({
		url: `/UserRole/delete/${id}`,
		method: 'post'
	})
}
