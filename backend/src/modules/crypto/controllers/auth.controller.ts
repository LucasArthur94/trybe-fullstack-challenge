import * as fs from 'fs'
import * as path from 'path'
import { Controller, Post, HttpException, Body, Logger } from '@nestjs/common'
import { SignInBody } from '../dto/user.dto'
import { randomString } from '../helpers/random-string'
import { User } from '../types/crypto.types'

type TokenResponse = {
  token: string
}

@Controller()
export class AuthController {
  constructor(private logger: Logger) {}

  @Post('login')
  async signIn(@Body() body: SignInBody): Promise<TokenResponse> {
    const userFile = fs.readFileSync(
      path.join(__dirname, '../../data/user.json')
    )

    const user = JSON.parse(userFile.toString()) as User

    if (body.email !== user.email || body.password !== user.password) {
      throw new HttpException('Campos inválidos', 400)
    }

    const newToken = randomString()

    const newUserData = {
      email: user.email,
      password: user.password,
      lastValidToken: newToken,
    }

    this.updateUserFile(newUserData)

    return {
      token: newToken,
    }
  }

  updateUserFile(userData: Record<string, string>): void {
    fs.writeFileSync(
      path.join(__dirname, '../../data/user.json'),
      JSON.stringify(userData)
    )
  }
}
