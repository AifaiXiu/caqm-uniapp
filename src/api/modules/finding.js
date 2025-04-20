// 和不符合项相关的接口
/**
 * 分页查询所有检查单
 */
export default {
  getFindings(page, size) {
    return request({
      url: '/findings',
      method: 'get',
      params: {
        page,
        size
      }
    })
  },
  getFindingsByIds(ids) {
    return request({
      url: '/findings/by-ids',
      method: 'post',
      data: {
        ids
      }
    })
  },
  addFinding(
    auditId,
    status,
    processId,
    airportId,
    closeUserId,
    targetCloseTime,
    deptId,
    findingTypeId,
    evaluateResult,
    measureDutyManId,
    finisherId,
    targetDate,
    finishDate,
    details,
    measureType,
    rootAnalyzeId,
    relatedDeptId,
    evaluateDutyManId,
    possibility,
    severity,
    riskValue,
    isSecure,
    eventDescribe,
    executeDate,
    secure
  ) {
    return request({
      url: '/findings',
      method: 'post',
      data: {
        auditId,
        status,
        processId,
        airportId,
        closeUserId,
        targetCloseTime,
        deptId,
        findingTypeId,
        evaluateResult,
        measureDutyManId,
        finisherId,
        targetDate,
        finishDate,
        details,
        measureType,
        rootAnalyzeId,
        relatedDeptId,
        evaluateDutyManId,
        possibility,
        severity,
        riskValue,
        isSecure,
        eventDescribe,
        executeDate,
        secure
      }
    })
  },
  updateFinding(
    id,
    auditId,
    status,
    processId,
    airportId,
    closeUserId,
    targetCloseTime,
    deptId,
    findingTypeId,
    evaluateResult,
    measureDutyManId,
    finisherId,
    targetDate,
    finishDate,
    details,
    measureType,
    rootAnalyzeId,
    relatedDeptId,
    evaluateDutyManId,
    possibility,
    severity,
    riskValue,
    isSecure,
    eventDescribe,
    executeDate,
    secure
  ) {
    return request({
      url: '/findings',
      method: 'post',
      data: {
        id,
        auditId,
        status,
        processId,
        airportId,
        closeUserId,
        targetCloseTime,
        deptId,
        findingTypeId,
        evaluateResult,
        measureDutyManId,
        finisherId,
        targetDate,
        finishDate,
        details,
        measureType,
        rootAnalyzeId,
        relatedDeptId,
        evaluateDutyManId,
        possibility,
        severity,
        riskValue,
        isSecure,
        eventDescribe,
        executeDate,
        secure
      }
    })
  },
  deleteFinding(id) {
    return request({
      url: `/findings/${id}`,
      method: 'delete'
    })
  }
}
