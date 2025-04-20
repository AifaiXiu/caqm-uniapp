// 封装和dataitem相关的请求
/**
 * type字段规范
 * 0:Airport
 * 1:AuditMethod
 * 2:Company
 * 3:Dept
 * 4:FindingType
 * 5:Process
 * 6:RiskSource
 * 7:RootAnalyze
 */

import { request } from '../request'

/**
 * 分页查询所有数据项
 */

export function getDataItems() {
  return request({
    url: '/dataitems',
    method: 'get',
    params: {
      page: 0,
      size: 10000000
    }
  })
}
export function addDataItem(type, value) {
  return request({
    url: '/dataitems',
    method: 'post',
    data: {
      type,
      value
    }
  })
}
export function deleteDataItem(id) {
  return request({
    url: `/dataitems/${id}`,
    method: 'delete'
  })
}
