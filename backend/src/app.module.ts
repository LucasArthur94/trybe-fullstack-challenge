import { APP_GUARD } from '@nestjs/core'
import { Module } from '@nestjs/common'

import { CryptoModule } from './modules/crypto/crypto.module'
import { AuthenticationGuard } from './modules/common/authentication.guard'

@Module({
  imports: [CryptoModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthenticationGuard,
    },
  ],
})
export class AppModule {}
