import axios from 'axios'
import { getAuthToken } from '../helpers/auth'

export const httpClient = axios.create({
  baseURL: 'http://localhost:3001/api',
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `${getAuthToken()}`,
  },
})
