// 和不符合项相关的接口
/**
 * 分页查询所有检查单
 */
import { request } from '../request'

export function getFindings() {
  return request({
    url: '/findings',
    method: 'get',
    params: {
      page: 0,
      size: 1000000
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
// 新增只增加基础内容
export function addFinding(
  auditId,
  processId,
  airportId,
  closeUserId,
  targetCloseTime,
  deptId,
  findingTypeId,
  evaluateResult
) {
  return request({
    url: '/findings',
    method: 'post',
    data: {
      status: 1,
      auditId,
      processId,
      airportId,
      closeUserId,
      targetCloseTime,
      deptId,
      findingTypeId,
      evaluateResult
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
  executeDate
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
      executeDate
    }
  })
}
export function deleteFinding(id) {
  return request({
    url: `/findings/${id}`,
    method: 'delete'
  })
}
