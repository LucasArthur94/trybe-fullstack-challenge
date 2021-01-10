import { loginPost } from '../../common/api'
import { LoginFormProps, LoginFormData } from './login-form.types'

export const useLoginForm = (): LoginFormProps => {
  const login = async (formData: LoginFormData) => {
    try {
      const { token } = await loginPost(formData)

      if (!token) {
        throw new Error('Error at sign in')
      }

      return {
        token,
      }
    } catch (error) {
      console.error(error)
      return {
        token: '',
      }
    }
  }
  return { login }
}
