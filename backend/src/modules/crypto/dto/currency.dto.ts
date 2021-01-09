import { IsPositive, IsEnum } from 'class-validator'
import { CURRENCIES } from '../types/crypto.types'

export class UpdateCurrencyBody {
  @IsEnum(CURRENCIES, { message: 'Valor inválido' })
  currency: string

  @IsPositive({ message: 'Moeda inválida' })
  value: number
}
