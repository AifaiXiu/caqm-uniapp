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
      // 这里是基础的不符合项内容
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
export function updateFinding(obj) {
  return request({
    url: '/findings',
    method: 'post',
    data: obj
  })
}

export function deleteFinding(id) {
  return request({
    url: `/findings/${id}`,
    method: 'delete'
  })
}

export function updateFindingBasic(obj) {
  return request({
    url: '/findings/basic',
    method: 'post',
    data: obj
  })
}

export function updateFindingEvaluate(obj) {
  return request({
    url: '/findings/evaluate',
    method: 'post',
    data: obj
  })
}
export function updateFindingMeasure(obj) {
  return request({
    url: '/findings/measure',
    method: 'post',
    data: obj
  })
}
