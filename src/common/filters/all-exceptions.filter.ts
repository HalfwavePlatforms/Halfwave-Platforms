import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { AppLogger } from '../logger/logger.service';
import { ApiErrorResponse } from '../interfaces/api-response.interface';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    private readonly logger: AppLogger,
  ) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<unknown>();
    const response = ctx.getResponse<unknown>();

    const requestId = (request as { id?: string }).id || 'N/A';
    const timestamp = new Date().toISOString();

    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let errorCode = 'INTERNAL_SERVER_ERROR';
    let errorMessage = 'An unexpected server error occurred.';
    let errorDetails: unknown = undefined;

    // 1. Resolve exception details
    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
        const resObj = exceptionResponse as {
          message?: string | string[];
          details?: unknown;
          error?: string;
        };
        errorMessage = Array.isArray(resObj.message)
          ? resObj.message.join(', ')
          : resObj.message || exception.message;
        errorDetails = resObj.details || undefined;
        // Extract original status code mapped names (e.g. 'Bad Request' -> 'BAD_REQUEST')
        const errString = resObj.error || 'HTTP_EXCEPTION';
        errorCode = errString.toString().toUpperCase().replace(/\s+/g, '_');
      } else {
        errorMessage = String(exceptionResponse);
      }
    } else if (typeof exception === 'object' && exception !== null) {
      const exceptionObj = exception as {
        code?: string;
        message?: string;
        stack?: string;
      };
      const prismaCode = exceptionObj.code;
      const originalMessage = exceptionObj.message || '';
      const stackTrace = exceptionObj.stack || '';

      // Map Database Prisma exceptions to appropriate REST codes
      if (prismaCode === 'P2002') {
        statusCode = HttpStatus.CONFLICT;
        errorCode = 'CONFLICT';
        errorMessage = 'Resource already exists (unique constraint violation).';
      } else if (prismaCode === 'P2025') {
        statusCode = HttpStatus.NOT_FOUND;
        errorCode = 'NOT_FOUND';
        errorMessage = 'Requested record not found.';
      } else {
        // Fallback for general unhandled runtime objects
        errorCode = 'DATABASE_ERROR';
        errorMessage = 'A database operation failed.';
      }

      // Log server-side detailed stack trace including Request Correlation ID
      const reqMethod = String(httpAdapter.getRequestMethod(request));
      const reqUrl = String(httpAdapter.getRequestUrl(request));
      this.logger.error(
        `[Request ID: ${requestId}] Exception on ${reqMethod} ${reqUrl} - Message: ${originalMessage}`,
        stackTrace || 'No Stack Trace',
        'AllExceptionsFilter',
      );
    } else {
      // General fallback log
      const reqMethod = String(httpAdapter.getRequestMethod(request));
      const reqUrl = String(httpAdapter.getRequestUrl(request));
      this.logger.error(
        `[Request ID: ${requestId}] Unhandled primitive exception on ${reqMethod} ${reqUrl} - Message: ${String(exception)}`,
        'No Stack Trace',
        'AllExceptionsFilter',
      );
    }

    // 2. Build standardized error payload
    const errorResponseBody: ApiErrorResponse = {
      success: false,
      error: {
        code: errorCode,
        message: errorMessage,
        details: errorDetails,
      },
      requestId,
      timestamp,
    };

    // Log the REST warning for non-500 client errors (keeps logging tidy while preserving error traces)
    if (statusCode < HttpStatus.INTERNAL_SERVER_ERROR) {
      this.logger.warn(
        `[Request ID: ${requestId}] Client warning (${statusCode}) ${errorCode}: ${errorMessage}`,
        'AllExceptionsFilter',
      );
    }

    httpAdapter.reply(response, errorResponseBody, statusCode);
  }
}
