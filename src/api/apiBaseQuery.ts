import { BaseQueryFn } from '@reduxjs/toolkit/query'
import RestClient from './restClient'

type RestClientBaseQuery = BaseQueryFn<
  {
    endpoint: string
    method: RestClient['method']
    data?: any
    headers?: RestClient['headers']
    withCredentials?: boolean
  },
  unknown,
  unknown
>

export const baseQuery =
  (): RestClientBaseQuery =>
  async ({ endpoint, method, data, headers, withCredentials }) => {
    // use restclient for fetch data
    const restClient = new RestClient(method, endpoint)

    // fetch data
    const response = await restClient.execute(headers, data, withCredentials)

    return response
  }
