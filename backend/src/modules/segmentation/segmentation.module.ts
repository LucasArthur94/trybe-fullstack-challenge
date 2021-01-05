import { Module, Logger } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AuthController } from './controllers/auth.controller'
import { SegmentationUsersService } from './services/segmentation-users.service'

@Module({
  controllers: [AuthController],
  exports: [TypeOrmModule],
  providers: [Logger, SegmentationUsersService],
})
export class SegmentationModule {}
