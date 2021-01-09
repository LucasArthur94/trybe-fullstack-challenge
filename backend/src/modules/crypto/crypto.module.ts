import { Module, Logger, HttpModule } from '@nestjs/common'

import { AuthController } from './controllers/auth.controller'
import { CryptoController } from './controllers/crypto.controller'
import { CoindeskService } from './services/coindesk.service'

@Module({
  imports: [HttpModule],
  controllers: [AuthController, CryptoController],
  providers: [Logger, CoindeskService],
})
export class CryptoModule {}
