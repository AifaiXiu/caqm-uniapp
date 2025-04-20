// 和检查单项相关的接口

import { request } from '../request'

/**
 * 分页查询所有检查单项
 */
export function getChecklistItems() {
  return request({
    url: '/checklistItems',
    method: 'get',
    params: {
      page: 0,
      size: 10000000
    }
  })
}
/**
 * 通过ids查询所有的检查单项
 */
export function getChecklistItemsByIds(ids) {
  return request({
    url: '/checklistItems/by-ids',
    method: 'post',
    data: {
      ids
    }
  })
}
/**
 *新增检查单项
 */
export function addChecklistItem(
  checklistItemName,
  checklistItemContent,
  checklistItemFilesIds,
  checklistItemRemark
) {
  return request({
    url: '/checklistItems',
    method: 'post',
    data: {
      type: 9,
      checklistItemName,
      checklistItemContent,
      checklistItemFilesIds,
      checklistItemRemark
    }
  })
}
/**
 *修改检查单项
 */
export function updateChecklistItem(
  id,
  checklistItemName,
  checklistItemContent,
  checklistItemFilesIds,
  checklistItemRemark,
  checklistNote,
  auditorsIds,
  findingId,
  status,
  checklistItemsFilesIds
) {
  return request({
    url: '/checklistItems',
    method: 'post',
    data: {
      id,
      type: 9,
      checklistItemName,
      checklistItemContent,
      checklistItemFilesIds,
      checklistItemRemark,
      checklistNote,
      auditorsIds,
      findingId,
      status,
      checklistItemsFilesIds
    }
  })
}
/**
 *删除检查单项
 */
export function deleteChecklistItem(id) {
  return request({
    url: `/checklistItems/${id}`,
    method: 'delete'
  })
}
