import * as fs from 'fs'
import * as path from 'path'
import {
  Controller,
  Get,
  Post,
  HttpException,
  Body,
  Logger,
  Inject,
} from '@nestjs/common'
import { UpdateCurrencyBody } from '../dto/currency.dto'
import { CoindeskService } from '../services/coindesk.service'
import { CryptoResult, Currency, Bpi, Currencies } from '../types/crypto.types'
import { DESCRIPTION_DICTIONARY } from '../helpers/dictionary'

@Controller('crypto')
export class CryptoController {
  @Inject(CoindeskService)
  private coindeskService: CoindeskService

  constructor(private logger: Logger) {}

  @Get('btc')
  async getAllCurrencies(): Promise<CryptoResult> {
    try {
      const result = this.coindeskService.getCoindeskData()

      const { data: coindeskData } = await result.toPromise()

      const currenciesFile = fs.readFileSync(
        path.join(__dirname, '../../data/currencies.json')
      )

      const currencies = JSON.parse(currenciesFile.toString()) as Currencies

      return {
        ...coindeskData,
        bpi: {
          USD: coindeskData.bpi.USD,
          BRL: this.getCurrency('BRL', coindeskData, currencies),
          EUR: this.getCurrency('EUR', coindeskData, currencies),
          CAD: this.getCurrency('CAD', coindeskData, currencies),
          BTC: coindeskData.bpi.BTC,
        },
      }
    } catch (err) {
      this.logger.error('Failed to calculate crypto currency', err)
      throw new HttpException('Failed to calculate crypto currency', 500)
    }
  }

  @Post('btc')
  async updateCurrency(
    @Body() body: UpdateCurrencyBody
  ): Promise<{ message: string }> {
    const currenciesFile = fs.readFileSync(
      path.join(__dirname, '../../data/currencies.json')
    )

    const currencies = JSON.parse(currenciesFile.toString()) as Currencies

    const updatedCurrencies = {
      ...currencies,
      [body.currency]: body.value.toLocaleString(undefined, {
        minimumFractionDigits: 3,
      }),
    }

    this.updateCurrencyFile(updatedCurrencies)

    return {
      message: 'Valor alterado com sucesso!',
    }
  }

  updateCurrencyFile(currencyData: Record<string, string>): void {
    fs.writeFileSync(
      path.join(__dirname, '../../data/currencies.json'),
      JSON.stringify(currencyData)
    )
  }

  getCurrency(
    currency: Currency,
    coindeskData: CryptoResult,
    currencies: Currencies
  ): Bpi {
    const usdToCurrencyRateFloat = Number(currencies[currency] || 0)

    if (!usdToCurrencyRateFloat) {
      this.logger.error(`Currency ${currency} not found at database`)
      throw new HttpException(`Currency ${currency} not found at database`, 404)
    }

    const { rate_float: usdToBtcRateFloat } = coindeskData.bpi['USD']

    const currencyToBtcRateFloat = usdToBtcRateFloat * usdToCurrencyRateFloat

    return {
      code: currency,
      rate: currencyToBtcRateFloat.toLocaleString(),
      description: DESCRIPTION_DICTIONARY[currency],
      rate_float: currencyToBtcRateFloat,
    }
  }
}
