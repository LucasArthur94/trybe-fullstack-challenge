import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { Observable } from 'rxjs'

import * as user from '../data/user.json'

const BYPASSED_HANDLERS = ['login']

@Injectable()
export class AuthenticationGuard implements CanActivate {
  async validateRequest(request: any): Promise<boolean> {
    try {
      const userToken = request?.authorization
      const lastUserToken = user.lastValidToken
      if (!userToken || !lastUserToken || userToken !== lastUserToken) {
        return false
      }
      return true
    } catch (e) {
      console.error(`Unauthorized: `, e)
      return false
    }
  }

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest()
    const handlerName = context.getHandler().name
    if (BYPASSED_HANDLERS.includes(handlerName)) return true
    return this.validateRequest(request)
  }
}
