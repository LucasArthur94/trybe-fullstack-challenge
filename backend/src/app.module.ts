import { APP_GUARD } from '@nestjs/core'
import { Module } from '@nestjs/common'

import { SegmentationModule } from './modules/segmentation/segmentation.module'
import { AuthenticationGuard } from './modules/common/authentication.guard'

@Module({
  imports: [SegmentationModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthenticationGuard,
    },
  ],
})
export class AppModule {}
