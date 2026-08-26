"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const swagger_1 = require("@nestjs/swagger");
const helmet_1 = __importDefault(require("helmet"));
const app_module_1 = require("./app.module");
const logger_service_1 = require("./common/logger/logger.service");
const all_exceptions_filter_1 = require("./common/filters/all-exceptions.filter");
const validation_pipe_1 = require("./common/pipes/validation.pipe");
const response_interceptor_1 = require("./common/interceptors/response.interceptor");
const logging_interceptor_1 = require("./common/interceptors/logging.interceptor");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        bufferLogs: true,
    });
    const logger = await app.resolve(logger_service_1.AppLogger);
    const configService = app.get(config_1.ConfigService);
    app.useLogger(logger);
    app.use((0, helmet_1.default)());
    app.enableCors({
        origin: configService.get('NODE_ENV') === 'production'
            ? configService.get('ALLOWED_ORIGINS')?.split(',') || []
            : true,
        credentials: true,
    });
    app.setGlobalPrefix('api');
    app.enableVersioning({
        type: common_1.VersioningType.URI,
        defaultVersion: '1',
    });
    app.useGlobalPipes(validation_pipe_1.globalValidationPipe);
    const httpAdapterHost = app.get(core_1.HttpAdapterHost);
    app.useGlobalFilters(new all_exceptions_filter_1.AllExceptionsFilter(httpAdapterHost, logger));
    app.useGlobalInterceptors(new response_interceptor_1.ResponseInterceptor(), new logging_interceptor_1.LoggingInterceptor(logger));
    const isProduction = configService.get('NODE_ENV') === 'production';
    if (!isProduction) {
        const config = new swagger_1.DocumentBuilder()
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
        const document = swagger_1.SwaggerModule.createDocument(app, config);
        swagger_1.SwaggerModule.setup('api/v1/docs', app, document);
        logger.log('Swagger documentation configured at: http://localhost:3000/api/v1/docs');
    }
    const port = configService.get('PORT') || 3000;
    await app.listen(port);
    logger.log(`Server running on port ${port} in ${configService.get('NODE_ENV')} mode`);
}
bootstrap().catch((err) => {
    console.error('Bootstrap failed:', err);
    process.exit(1);
});
//# sourceMappingURL=main.js.map