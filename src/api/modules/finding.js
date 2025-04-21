// 和不符合项相关的接口
/**
 * 分页查询所有检查单
 */
export function getFindings(page, size) {
  return request({
    url: '/findings',
    method: 'get',
    params: {
      page,
      size
    }
  })
}
export function getFindingsByIds(ids) {
  return request({
    url: '/findings/by-ids',
    method: 'post',
    data: {
      ids
    }
  })
}
export function addFinding(
  auditId,
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
      status: 1,
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
}
export function updateFinding(
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
}
export function deleteFinding(id) {
  return request({
    url: `/findings/${id}`,
    method: 'delete'
  })
}
