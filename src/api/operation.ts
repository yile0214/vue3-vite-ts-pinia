import { resuest } from '@/utils/axios'
// 获取操作列表
export function listByMenu(params) {
  return resuest.instance({
    url: `/UserOperation/listByMenu`,
    method: 'get',
    params
  })
}

// 添加操作
export function addUserOperation(data) {
  return resuest.instance({
    url: '/UserOperation/create',
    method: 'post',
    data
  })
}

// 修改操作
export function editUserOperation(data) {
  return resuest.instance({
    url: '/UserOperation/update',
    method: 'post',
    data
  })
}

// 删除操作
export function deleteUserOperation(id) {
  return resuest.instance({
    url: `/UserOperation/delete/${id}`,
    method: 'post'
  })
}
