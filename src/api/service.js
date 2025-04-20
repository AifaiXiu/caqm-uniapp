import axios from 'axios'
import { createUniAppAxiosAdapter } from '@uni-helper/axios-adapter'
export function createService() {
  const request = axios.create({ adapter: createUniAppAxiosAdapter() })
  request.interceptors.request.use(
    (request) => {
      return request
    },
    (err) => {
      return Promise.reject(err)
    }
  )

  request.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      console.log(error)
      return Promise.reject(error)
    }
  )
  return request
}

export const service = createService()
