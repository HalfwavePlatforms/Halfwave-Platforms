import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { AppLogger } from './common/logger/logger.service';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { globalValidationPipe } from './common/pipes/validation.pipe';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  const logger = await app.resolve(AppLogger);
  const configService = app.get(ConfigService);

  // Override standard logger with custom Winston logger
  app.useLogger(logger);

  // Configure security headers via Helmet
  app.use(helmet());

  // Configure CORS whitelists
  app.enableCors({
    origin:
      configService.get<string>('NODE_ENV') === 'production'
        ? configService.get<string>('ALLOWED_ORIGINS')?.split(',') || []
        : true,
    credentials: true,
  });

  // URI-based API Versioning
  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  // Global DTO input validation
  app.useGlobalPipes(globalValidationPipe);

  // Catch-all Exception Filter
  const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapterHost, logger));

  // Global Response and Latency Logging Interceptors
  app.useGlobalInterceptors(
    new ResponseInterceptor(),
    new LoggingInterceptor(logger),
  );

  // Swagger Documentation configuration
  const isProduction = configService.get<string>('NODE_ENV') === 'production';
  if (!isProduction) {
    const config = new DocumentBuilder()
      .setTitle('Halfwave Platforms Backend API')
      .setDescription('Enterprise API documentation for Halfwave Platforms')
      .setVersion('1.0')
      .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT Access Token',
        in: 'header',
      })
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/v1/docs', app, document);
    logger.log(
      'Swagger documentation configured at: http://localhost:3000/api/v1/docs',
    );
  }

  const port = configService.get<number>('PORT') || 3000;
  await app.listen(port);
  logger.log(
    `Server running on port ${port} in ${configService.get<string>('NODE_ENV')} mode`,
  );
}

bootstrap().catch((err: unknown) => {
  console.error('Bootstrap failed:', err);
  process.exit(1);
});
