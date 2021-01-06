import { IsNumberString, IsEmail, Length } from 'class-validator'

export class SignInBody {
  @IsEmail()
  email: string

  @IsNumberString({ no_symbols: true })
  @Length(6, 6)
  password: string
}
