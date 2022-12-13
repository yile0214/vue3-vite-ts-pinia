import { request } from '@/utils/axios'

export function getList() {
	return request.instance({
		url: '/DeviceGroup/listWithDevice',
		method: 'get'
	})
}
// 用户分页
export function userList() {
	return request.instance({
		url: `/User/list`,
		method: 'get'
	})
}

// 用户分页列表
export function userPageList(params) {
	return request.instance({
		url: `/User/pageList`,
		method: 'get',
		params
	})
}

// 新增用户
export function addUser(data) {
	return request.instance({
		url: '/User/create',
		method: 'post',
		data
	})
}

// 修改用户
export function editUser(data) {
	return request.instance({
		url: '/User/update',
		method: 'post',
		data
	})
}

// 删除用户
export function deleteUser(id) {
	return request.instance({
		url: `/User/delete/${id}`,
		method: 'post'
	})
}

// 获取用户信息
export function userInfo() {
	return request.instance({
		url: `/User/getMyUser`,
		method: 'get'
	})
}

// 登录
export function login(user, password) {
	return request.instance({
		url: `/User/loginPassword/${user}/${password}`,
		method: 'get'
	})
}

// 获取用户
export function getUserInfo() {
	return request.instance({
		url: `/User/getByToken`,
		method: 'get'
	})
}
