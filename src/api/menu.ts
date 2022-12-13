import { resuest } from '@/utils/axios'
// 获取菜单树
export function userMenuTree(appId) {
	return resuest.instance({
		url: `/UserMenu/tree/${appId}`,
		method: 'get'
	})
}

// 获取菜单树
export function userMenuRoute(appId) {
	return resuest.instance({
		url: `/UserMenu/route/${appId}`,
		method: 'get'
	})
}

// 添加菜单
export function addUserMenu(data) {
	return resuest.instance({
		url: '/UserMenu/create',
		method: 'post',
		data
	})
}

// 修改菜单
export function editUserMenu(data) {
	return resuest.instance({
		url: '/UserMenu/update',
		method: 'post',
		data
	})
}

// 删除菜单
export function deleteUserMenu(id) {
	return resuest.instance({
		url: `/UserMenu/delete/${id}`,
		method: 'post'
	})
}
