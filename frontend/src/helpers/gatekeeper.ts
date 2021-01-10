import { NextPageContext } from 'next'
import { getAuthToken } from './auth'

enum AuthPolicy {
  Everyone,
  Anonymous,
  Logged,
}

const allowedEntryPoints = [
  {
    regex: /^\/login$/,
    authPolicy: AuthPolicy.Everyone,
  },
  {
    regex: /^\/(update\-currency)?/,
    authPolicy: AuthPolicy.Logged,
  },
]

export const getEntryPointRedirect = (ctx: NextPageContext) => {
  const hasToken = !!getAuthToken()

  const entryPoint = allowedEntryPoints.find((rule) =>
    ctx.pathname.match(rule.regex)
  )

  console.log(entryPoint, hasToken)

  if (entryPoint) {
    if (entryPoint.authPolicy === AuthPolicy.Everyone) {
      return
    }

    if (entryPoint.authPolicy === AuthPolicy.Anonymous && !hasToken) {
      return
    }

    if (entryPoint.authPolicy === AuthPolicy.Logged && hasToken) {
      return
    }
  }

  return hasToken ? '/' : '/login'
}
