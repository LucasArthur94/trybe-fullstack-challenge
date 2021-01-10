import { getAuthToken } from '../helpers/auth'
import { httpClient } from './httpClient'
import { CryptoResult } from './types'

type Login = {
  email: string
  password: string
}

type UpdateCurrency = {
  currency: string
  value: number
}

export const loginPost = async (input: Login) => {
  try {
    const { data } = await httpClient.request<{ token: string }>({
      method: 'POST',
      data: input,
      url: 'login',
    })

    return data
  } catch (err) {
    console.error('Failed to login request')

    return {
      token: '',
    }
  }
}

export const cryptoGet = async () => {
  try {
    const authToken = getAuthToken()

    const { data } = await httpClient.request<CryptoResult>({
      method: 'GET',
      headers: {
        Authorization: authToken,
      },
      url: 'crypto/btc',
    })

    return data
  } catch (err) {
    console.error('Failed to get currencies request')

    return undefined
  }
}

export const cryptoPost = async (input: UpdateCurrency) => {
  try {
    const authToken = getAuthToken()

    const { data } = await httpClient.request<{ message: string }>({
      method: 'POST',
      headers: {
        Authorization: authToken,
      },
      data: input,
      url: 'crypto/btc',
    })

    return data
  } catch (err) {
    console.error('Failed to get currencies request')

    return undefined
  }
}
