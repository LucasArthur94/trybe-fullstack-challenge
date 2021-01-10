import { httpClient } from './httpClient'

type Login = {
  email: string
  password: string
}

export const loginPost = async (input: Login) => {
  try {
    const { data } = await httpClient.request<Login>({
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
