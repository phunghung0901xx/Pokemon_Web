export interface HttpResponse {
  statusCode: number | string
  statusText: string
  data?: any
  headers?: any
  error?: any
  message?: string
  success?: any
}

export const DEFAULT_ERROR_RESPONSE: HttpResponse = {
  statusCode: 500,
  statusText: 'Failed',
  error: true
}

export const createResponseData = (response: any) => {
  const httpResponse: HttpResponse = {
    statusCode: response?.statusCode || 200,
    statusText: response?.statusText || '',
    data: response?.data,
    headers: response?.headers,
    message: response?.message || ''
  }
  if (response) {
    httpResponse.success = response.success
    if (response.Problem && response.Problem === 'TIMEOUT_ERROR') {
      httpResponse.message = 'Request timeout'
    }
    if (Array.isArray(response.data)) {
      httpResponse.data = { items: response.data }
    } else {
      httpResponse.data = response.data
    }
  }
  return httpResponse
}

export const createCustomResponseData = (response: any) => {
  const httpResponse: HttpResponse = {
    statusCode: response.statusCode,
    statusText: response.statusText,
    data: response.data,
    headers: response.headers,
    message: response.message || ''
  }
  // TODO: add your custom object mapping here
  return httpResponse
}
