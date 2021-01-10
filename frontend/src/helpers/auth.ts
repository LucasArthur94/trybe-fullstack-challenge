import { getLocalStorage, setLocalStorage } from './localStorage'

export const getAuthToken = () => getLocalStorage('token')
export const setAuthToken = (token: string) => setLocalStorage('token', token)
