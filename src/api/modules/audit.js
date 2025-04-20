// 和审计相关的接口
/**
 * 分页查询所有检查单
 */
export default {
  getAudits(page, size) {
    return request({
      url: '/audits',
      method: 'get',
      params: {
        page,
        size
      }
    })
  },
  getAuditsByIds(ids) {
    return request({
      url: '/audits',
      method: 'post',
      data: {
        ids
      }
    })
  },
  addAudit(
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
  },
  updateAudit(
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
  },
  deleteAudit(id) {
    return request({
      url: `/audits/${id}`,
      method: 'delete'
    })
  }
}
