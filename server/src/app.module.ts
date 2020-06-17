import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AuthController } from './modules/user/auth.controller';
import { ProfileController } from './modules/user/profile.controller';
import { AuthService } from './modules/user/auth.service';
import { ProfileService } from './modules/user/profile.service';
import { ActivityLogService } from './modules/shared/activity-logs.service';
import { MailService } from './modules/shared/mail.service';
import { CheckAuthMiddleware } from './modules/user/auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    TypeOrmModule.forRoot(),
    ServeStaticModule.forRoot({ rootPath: 'public' }),
  ],
  controllers: [
    AuthController, 
    ProfileController
  ],
  providers: [
    AuthService, 
    ProfileService, 
    ActivityLogService, 
    MailService
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CheckAuthMiddleware).forRoutes({ path: '/api/auth/user', method: RequestMethod.GET });
    consumer.apply(CheckAuthMiddleware).forRoutes(ProfileController);
  }
}
