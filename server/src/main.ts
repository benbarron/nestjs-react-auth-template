import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { User } from './modules/user/user.entity';

async function bootstrap() {
  const logger: Logger = new Logger('main.js');
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(process.env.PORT, () => logger.log(`Server started on port ${process.env.PORT}`));
}

bootstrap();
