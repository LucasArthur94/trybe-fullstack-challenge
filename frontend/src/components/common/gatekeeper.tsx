import React, { FC, useEffect } from 'react'
import Router, { useRouter } from 'next/router'
import { getAuthToken } from '../../helpers/auth'

export const Gatekeeper: FC = () => {
  const hasToken = !!getAuthToken()

  const { pathname } = useRouter()

  useEffect(() => {
    if (!hasToken) {
      Router.push('/login')
    } else if (pathname === '/login') {
      Router.push('/')
    }
  }, [hasToken])

  return null
}
