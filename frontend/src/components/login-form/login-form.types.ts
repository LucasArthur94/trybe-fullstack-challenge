export type LoginResProps = {
  token: string
}

export type LoginFormData = {
  email: string
  password: string
}

export type LoginFormProps = {
  customError: string
  setCustomError: (customError: string) => void
  login: (formData: LoginFormData) => Promise<LoginResProps>
}
