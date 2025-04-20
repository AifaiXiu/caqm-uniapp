// 和文件相关的接口
// 和检查单项相关的接口
/**
 * type
 * 8
 */

import { request } from '../request'

/**
 * 分页查询所有文件
 */
export function getFiles() {
  return request({
    url: '/files',
    method: 'get',
    params: {
      page: 0,
      size: 10000000
    }
  })
}
export function addFile(fileName, filePath) {
  return request({
    url: '/files',
    method: 'post',
    data: {
      type: 8,
      fileName,
      filePath
    }
  })
}
export function deleteFile(id) {
  return request({
    url: `/files/${id}`,
    method: 'delete'
  })
}
