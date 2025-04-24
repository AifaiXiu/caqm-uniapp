// 和用户相关的接口
/**
 * 分页查询所有用户
 */
import { request } from '../request'

export function getUsers() {
  return request({
    url: '/users',
    method: 'get',
    params: {
      page: 0,
      size: 10000000
    }
  })
}
export function getUsersByIds(ids) {
  return request({
    url: '/users/by-ids',
    method: 'post',
    data: {
      ids
    }
  })
}
/**
 *新增用户
 */
export function addUser(username, email, passwd, deptId) {
  return request({
    url: '/users',
    method: 'post',
    data: {
      username,
      email,
      passwd,
      deptId
    }
  })
}

/**
 *修改用户
 */
export function updataUser(id, username, email, passwd, deptId) {
  return request({
    url: '/users',
    method: 'post',
    data: {
      id,
      username,
      email,
      passwd,
      deptId
    }
  })
}
/**
 * 删除用户
 */
export function deleteUser(id) {
  return request({
    url: `/users/${id}`,
    method: 'delete'
  })
}

export function login(obj) {
  return request({
    url: '/users/login',
    method: 'post',
    data: obj
  })
}
