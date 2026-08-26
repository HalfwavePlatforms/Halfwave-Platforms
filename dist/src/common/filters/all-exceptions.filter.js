"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllExceptionsFilter = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const logger_service_1 = require("../logger/logger.service");
let AllExceptionsFilter = class AllExceptionsFilter {
    httpAdapterHost;
    logger;
    constructor(httpAdapterHost, logger) {
        this.httpAdapterHost = httpAdapterHost;
        this.logger = logger;
    }
    catch(exception, host) {
        const { httpAdapter } = this.httpAdapterHost;
        const ctx = host.switchToHttp();
        const request = ctx.getRequest();
        const response = ctx.getResponse();
        const requestId = request.id || 'N/A';
        const timestamp = new Date().toISOString();
        let statusCode = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        let errorCode = 'INTERNAL_SERVER_ERROR';
        let errorMessage = 'An unexpected server error occurred.';
        let errorDetails = undefined;
        if (exception instanceof common_1.HttpException) {
            statusCode = exception.getStatus();
            const exceptionResponse = exception.getResponse();
            if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
                const resObj = exceptionResponse;
                errorMessage = Array.isArray(resObj.message)
                    ? resObj.message.join(', ')
                    : resObj.message || exception.message;
                errorDetails = resObj.details || undefined;
                const errString = resObj.error || 'HTTP_EXCEPTION';
                errorCode = errString.toString().toUpperCase().replace(/\s+/g, '_');
            }
            else {
                errorMessage = String(exceptionResponse);
            }
        }
        else if (typeof exception === 'object' && exception !== null) {
            const exceptionObj = exception;
            const prismaCode = exceptionObj.code;
            const originalMessage = exceptionObj.message || '';
            const stackTrace = exceptionObj.stack || '';
            if (prismaCode === 'P2002') {
                statusCode = common_1.HttpStatus.CONFLICT;
                errorCode = 'CONFLICT';
                errorMessage = 'Resource already exists (unique constraint violation).';
            }
            else if (prismaCode === 'P2025') {
                statusCode = common_1.HttpStatus.NOT_FOUND;
                errorCode = 'NOT_FOUND';
                errorMessage = 'Requested record not found.';
            }
            else {
                errorCode = 'DATABASE_ERROR';
                errorMessage = 'A database operation failed.';
            }
            const reqMethod = String(httpAdapter.getRequestMethod(request));
            const reqUrl = String(httpAdapter.getRequestUrl(request));
            this.logger.error(`[Request ID: ${requestId}] Exception on ${reqMethod} ${reqUrl} - Message: ${originalMessage}`, stackTrace || 'No Stack Trace', 'AllExceptionsFilter');
        }
        else {
            const reqMethod = String(httpAdapter.getRequestMethod(request));
            const reqUrl = String(httpAdapter.getRequestUrl(request));
            this.logger.error(`[Request ID: ${requestId}] Unhandled primitive exception on ${reqMethod} ${reqUrl} - Message: ${String(exception)}`, 'No Stack Trace', 'AllExceptionsFilter');
        }
        const errorResponseBody = {
            success: false,
            error: {
                code: errorCode,
                message: errorMessage,
                details: errorDetails,
            },
            requestId,
            timestamp,
        };
        if (statusCode < common_1.HttpStatus.INTERNAL_SERVER_ERROR) {
            this.logger.warn(`[Request ID: ${requestId}] Client warning (${statusCode}) ${errorCode}: ${errorMessage}`, 'AllExceptionsFilter');
        }
        httpAdapter.reply(response, errorResponseBody, statusCode);
    }
};
exports.AllExceptionsFilter = AllExceptionsFilter;
exports.AllExceptionsFilter = AllExceptionsFilter = __decorate([
    (0, common_1.Catch)(),
    __metadata("design:paramtypes", [core_1.HttpAdapterHost,
        logger_service_1.AppLogger])
], AllExceptionsFilter);
//# sourceMappingURL=all-exceptions.filter.js.map