import axios, { AxiosInstance } from 'axios'
import lodash from 'lodash'
import { createCustomResponseData, createResponseData, DEFAULT_ERROR_RESPONSE } from './response'
import GlobalKeys from '../enums/globalKeys'
import { HttpMethods } from '../enums/httpMethods'
import apiUrls from './url'
import addKeyLocalStorage from '../utils/localStorage'
import { ScalableModel } from '../models/base'

class RestClient {
  public method: HttpMethods
  public endpoint: string
  public timeout: number

  public headers: ScalableModel

  private baseUrl: string = `https://${apiUrls.baseUrl}`

  private apiInstance?: AxiosInstance

  constructor(method: HttpMethods, endpoint: string, timeout: number | undefined = 15000) {
    this.method = method
    this.endpoint = endpoint
    this.timeout = timeout
    this.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  }

  setBaseUrl(url: string) {
    this.baseUrl = url
  }

  setHeaders(headers: ScalableModel) {
    if (headers !== null) {
      Object.keys(headers).map((key: string) => {
        this.headers[key] = headers[key]
        return null
      })
    }
  }

  setTimeout(timeout: number) {
    this.timeout = timeout
  }

  clearToken() {
    // ** Remove user, accessToken & refreshToken from localStorage
    localStorage.removeItem(addKeyLocalStorage(GlobalKeys.AUTH_TOKEN))
    localStorage.removeItem(addKeyLocalStorage(GlobalKeys.ACCESS_TOKEN))
    localStorage.removeItem(addKeyLocalStorage(GlobalKeys.REFRESH_TOKEN))

    window.location.replace('/login')
  }

  execute(headers: any, body: any, withCredentials = false) {
    if (!withCredentials) {
      delete this.headers.Authorization
    } else {
      const authToken = lodash.get(global, GlobalKeys.AUTH_TOKEN, localStorage.getItem(addKeyLocalStorage(GlobalKeys.AUTH_TOKEN)))

      if (authToken) {
        this.headers.Authorization = `Bearer ${authToken}`
      }
    }

    if (headers !== undefined && headers !== null) {
      this.headers = Object.assign(this.headers, headers)
    }

    this.apiInstance = axios.create({
      baseURL: this.baseUrl,
      headers: this.headers,
      timeout: this.timeout,
      withCredentials: false
    })

    switch (this.method) {
      case HttpMethods.GET: {
        return this.apiInstance
          .get(this.endpoint, body)
          .then((res) => {
            if (this.baseUrl === apiUrls.baseUrl) {
              return createResponseData(res.data || {})
            }

            return createCustomResponseData(res.data)
          })
          .catch(({ response, message }) => {
            if (response?.status === 401 || response?.status === 505) {
              this.clearToken()
            }
            console.log('ERROR: ApiMethod.GET', message)
            return DEFAULT_ERROR_RESPONSE
          })
      }
      case HttpMethods.POST: {
        return this.apiInstance
          .post(this.endpoint, body)
          .then((res) => {
            if (this.baseUrl === apiUrls.baseUrl) {
              return createResponseData(res.data || {})
            }

            return createCustomResponseData(res.data)
          })
          .catch(({ response, message }) => {
            if (response?.status === 401 || response?.status === 505) {
              this.clearToken()
            }
            console.log('ERROR: ApiMethod.POST', message)
            const errorResponse = {
              ...DEFAULT_ERROR_RESPONSE,
              error: response.data
            }
            return errorResponse
          })
      }
      case HttpMethods.PUT: {
        return this.apiInstance
          .put(this.endpoint, body)
          .then((res) => {
            if (this.baseUrl === apiUrls.baseUrl) {
              return createResponseData(res.data || {})
            }

            return createCustomResponseData(res.data)
          })
          .catch(({ response, message }) => {
            if (response?.status === 401 || response?.status === 505) {
              this.clearToken()
            }
            console.log('ERROR: ApiMethod.PUT', message)
            return DEFAULT_ERROR_RESPONSE
          })
      }
      case HttpMethods.DELETE: {
        return this.apiInstance
          .request({
            method: HttpMethods.DELETE,
            url: this.endpoint,
            data: body
          })
          .then((res) => {
            if (this.baseUrl === apiUrls.baseUrl) {
              return createResponseData(res.data || {})
            }

            return createCustomResponseData(res.data)
          })
          .catch(({ response, message }) => {
            if (response?.status === 401 || response?.status === 505) {
              this.clearToken()
            }
            console.log('ERROR: ApiMethod.DELETE', message)
            return DEFAULT_ERROR_RESPONSE
          })
      }

      case HttpMethods.PATCH: {
        return this.apiInstance
          .patch(this.endpoint, body)
          .then((res) => {
            if (this.baseUrl === apiUrls.baseUrl) {
              return createResponseData(res.data || {})
            }
            return createCustomResponseData(res.data)
          })
          .catch(({ response, message }) => {
            if (response?.status === 401 || response?.status === 505) {
              this.clearToken()
            }
            console.log('ERROR: ApiMethod.PATCH', message)
            return DEFAULT_ERROR_RESPONSE
          })
      }

      default: {
        return DEFAULT_ERROR_RESPONSE
      }
    }
  }
}

export default RestClient
