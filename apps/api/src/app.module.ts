import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import configuration from './config';
import { validate as validateEnv } from './config/env.validation';
import { LoggerModule } from './common/logger/logger.module';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './modules/users/users.module';
import { RolesModule } from './modules/roles/roles.module';
import { PermissionsModule } from './modules/permissions/permissions.module';
import { ContactModule } from './modules/contact/contact.module';
import { EmailModule } from './modules/email/email.module';
import { ServicesModule } from './modules/services/services.module';
import { RequestIdMiddleware } from './common/middleware/request-id.middleware';
import { RequestLoggerMiddleware } from './common/middleware/request-logger.middleware';

@Module({
  imports: [
    // Centralized Config Module loaded globally
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validate: validateEnv,
    }),

    // Global Rate Limiter: 100 requests per 60 seconds
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => [
        {
          ttl: 60000,
          limit:
            configService.get<string>('NODE_ENV') === 'production' ? 100 : 1000,
        },
      ],
    }),

    // Logging Module
    LoggerModule,

    // Database Connection Module
    DatabaseModule,

    // Users Module
    UsersModule,

    // Roles Module
    RolesModule,

    // Permissions Module
    PermissionsModule,

    // Contact Enquiry Module
    ContactModule,

    // Global Email Module
    EmailModule,

    // Services Catalog Module
    ServicesModule,
  ],
  providers: [
    // Enable Global Rate Limiting across all routes
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestIdMiddleware, RequestLoggerMiddleware).forRoutes('*');
  }
}
