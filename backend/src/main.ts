import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

import { config } from './config'
import { Logger, LoggingInterceptor } from './logger'
import { NotFoundExceptionFilter } from './modules/common/not-found-exception.filter'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new Logger(),
    cors: true,
  })
  app.useGlobalInterceptors(new LoggingInterceptor())
  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalFilters(new NotFoundExceptionFilter())
  app.setGlobalPrefix('/api')
  await app.listen(config.port)
}
bootstrap()
