import { Injectable, HttpService } from '@nestjs/common'
import { CryptoResult } from '../types/crypto.types'
import { config } from '../../../config'

@Injectable()
export class CoindeskService {
  private coindeskApi: string

  constructor(private httpService: HttpService) {
    this.coindeskApi = config.utils.coindeskApi
  }

  async getCoindeskData(): Promise<CryptoResult> {
    const result = this.httpService.get(this.coindeskApi)

    const { data: coindeskData } = await result.toPromise()

    return coindeskData
  }
}
