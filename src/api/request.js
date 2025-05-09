import { service } from './service'
function createRequest(service) {
  function request(config) {
    // config 自定义配置
    // axios默认配置
    const configDefault = {
      baseURL: 'http://152.136.166.253:8080', // 所有通过此配置的基础地址 在.env文件配置
      timeout: 15000, // 请求超时时间
      responseType: 'json', // 响应类型
      headers: {
        // 请求头配置...
      }
    }
    const requestConfig = Object.assign(configDefault, config)
    return service(requestConfig)
  }
  return request
}

export const request = createRequest(service)
