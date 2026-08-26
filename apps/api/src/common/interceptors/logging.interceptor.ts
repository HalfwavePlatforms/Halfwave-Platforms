import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AppLogger } from '../logger/logger.service';
import { Request } from 'express';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: AppLogger) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const httpCtx = context.switchToHttp();
    const request = httpCtx.getRequest<Request>();

    const method = request.method;
    const url = request.originalUrl || request.url;
    const requestId = (request as unknown as { id?: string }).id || 'N/A';
    const startTime = Date.now();

    return next.handle().pipe(
      tap({
        next: () => {
          const duration = Date.now() - startTime;
          this.logger.log(
            `[Request ID: ${requestId}] ${method} ${url} completed successfully in ${duration}ms`,
            'LoggingInterceptor',
          );
        },
        error: () => {
          const duration = Date.now() - startTime;
          this.logger.warn(
            `[Request ID: ${requestId}] ${method} ${url} terminated with error in ${duration}ms`,
            'LoggingInterceptor',
          );
        },
      }),
    );
  }
}
