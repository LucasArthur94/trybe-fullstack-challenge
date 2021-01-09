import { Observable } from 'rxjs'
import { AxiosResponse } from 'axios'
import { Injectable, HttpService } from '@nestjs/common'
import { CryptoResult } from '../types/crypto.types'
import { config } from '../../../config'

@Injectable()
export class CoindeskService {
  private coindeskApi: string

  constructor(private httpService: HttpService) {
    this.coindeskApi = config.utils.coindeskApi
  }

  getCoindeskData(): Observable<AxiosResponse<CryptoResult>> {
    return this.httpService.get(this.coindeskApi)
  }
}
