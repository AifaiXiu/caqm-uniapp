// 和审计相关的接口
/**
 * 分页查询所有检查单
 */
import { request } from '../request'

export function getAudits() {
  return request({
    url: '/audits',
    method: 'get',
    params: {
      page: 0,
      size: 1000000
    }
  })
}
export function getAuditsByIds(ids) {
  return request({
    url: '/audits',
    method: 'post',
    data: {
      ids
    }
  })
}
export function addAudit(
  name,
  deptId,
  plannedStartDate,
  plannedEndDate,
  realStartDate,
  realEndDate,
  airportId,
  processId,
  mainAuditorId,
  otherAuditorsId,
  auditMethodId,
  closeUserId,
  remark,
  checklistsIds,
  summary
) {
  return request({
    url: '/audits',
    method: 'post',
    data: {
      name,
      deptId,
      plannedStartDate,
      plannedEndDate,
      realStartDate,
      realEndDate,
      airportId,
      processId,
      mainAuditorId,
      otherAuditorsId,
      auditMethodId,
      closeUserId,
      remark,
      checklistsIds,
      summary,
      findingsIds: 0,
      status: 0
    }
  })
}
// findingsids and status  在新增的时候都是默认值
export function updateAudit(
  id,
  name,
  deptId,
  plannedStartDate,
  plannedEndDate,
  realStartDate,
  realEndDate,
  airportId,
  processId,
  mainAuditorId,
  otherAuditorsId,
  auditMethodId,
  status,
  closeUserId,
  remark,
  checklistsIds,
  findingsIds,
  summary
) {
  return request({
    url: '/audits',
    method: 'post',
    data: {
      id,
      name,
      deptId,
      plannedStartDate,
      plannedEndDate,
      realStartDate,
      realEndDate,
      airportId,
      processId,
      mainAuditorId,
      otherAuditorsId,
      auditMethodId,
      status,
      closeUserId,
      remark,
      checklistsIds,
      findingsIds,
      summary
    }
  })
}
export function deleteAudit(id) {
  return request({
    url: `/audits/${id}`,
    method: 'delete'
  })
}
