export type LoginResProps = {
  token: string
}

export type LoginFormData = {
  email: string
  password: string
}

export type LoginFormProps = {
  login: (formData: LoginFormData) => Promise<LoginResProps>
}
