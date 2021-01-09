import * as fs from 'fs'
import * as path from 'path'
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { User } from '../crypto/types/crypto.types'

const BYPASSED_HANDLERS = ['signIn']

@Injectable()
export class AuthenticationGuard implements CanActivate {
  async validateRequest(request: any): Promise<boolean> {
    try {
      const userFile = fs.readFileSync(
        path.join(__dirname, '../data/user.json')
      )
      const user = JSON.parse(userFile.toString()) as User

      const userToken = request?.headers.authorization
      const lastUserToken = user.lastValidToken

      if (!userToken || !lastUserToken || userToken !== lastUserToken) {
        throw new UnauthorizedException('Token inválido')
      }
      return true
    } catch (e) {
      console.error(`Unauthorized: `, e)
      throw new UnauthorizedException('Token inválido')
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
