import fs from 'fs'
import {
  Controller,
  Post,
  HttpStatus,
  HttpException,
  Body,
  Put,
  Logger,
  Param,
  Delete,
} from '@nestjs/common'
import { SignInBody } from '../dto/user.dto'
import { randomString } from '../helpers/random-string'
import * as user from '../../data/user.json'

export type TokenResponse = {
  token: string
}

@Controller()
export class AuthController {
  constructor(private logger: Logger) {}

  @Post('login')
  async signIn(@Body() body: SignInBody): Promise<TokenResponse> {
    if (body.email !== user.email || body.password !== user.password) {
      throw new HttpException('Campos inválidos', 400)
    }

    const newToken = randomString()

    const newUserData = {
      email: user.email,
      password: user.password,
      lastValidToken: user.lastValidToken,
    }

    this.updateUser(newUserData)

    return {
      token: newToken,
    }
  }

  updateUser(userData: Record<string, string>): void {
    fs.writeFile('../../data/user.json', userData, (err: any) =>
      this.logger.error(err)
    )
  }
}
