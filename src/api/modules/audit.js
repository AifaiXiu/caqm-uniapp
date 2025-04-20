// 和审计相关的接口
/**
 * 分页查询所有检查单
 */
export function getAudits(page, size) {
  return request({
    url: '/audits',
    method: 'get',
    params: {
      page,
      size
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
  findingsIds,
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
      findingsIds,
      summary
    }
  })
}
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
