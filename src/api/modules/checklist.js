// 和检查单相关的接口
import { request } from '../request'

/**
 * 分页查询所有检查单
 */
export function getChecklists() {
  return request({
    url: '/checklists',
    method: 'get',
    params: {
      page: 0,
      size: 1000000
    }
  })
}
export function getChecklistsByIds(ids) {
  return request({
    url: '/checklists/by-ids',
    method: 'post',
    data: {
      ids
    }
  })
}
export function addChecklist(name, deptId, remark, filesIds, checklistItemsIds) {
  return request({
    url: '/checklists',
    method: 'post',
    data: {
      name,
      deptId,
      remark,
      filesIds,
      checklistItemsIds
    }
  })
}
export function updateChecklist(id, name, deptId, status, remark, filesIds, checklistItemsIds) {
  return request({
    url: '/checklists',
    method: 'post',
    data: {
      id,
      name,
      deptId,
      status,
      remark,
      filesIds,
      checklistItemsIds
    }
  })
}
export function deleteChecklist(id) {
  return request({
    url: `/checklists/${id}`,
    method: 'delete'
  })
}
