import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse } from '../interfaces/api-response.interface';
import { Request } from 'express';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<
  T,
  ApiResponse<T>
> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ApiResponse<T>> {
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest<Request>();
    // Cast request object safely to get tracing request correlation ID
    const requestId = (request as unknown as { id?: string }).id || 'N/A';

    return next.handle().pipe(
      map((responsePayload: unknown) => {
        const timestamp = new Date().toISOString();

        // Detect if the service returned a paginated envelope containing both data and metadata
        if (
          responsePayload &&
          typeof responsePayload === 'object' &&
          'data' in responsePayload &&
          'meta' in responsePayload
        ) {
          const paginated = responsePayload as {
            data: T;
            meta: Record<string, unknown>;
          };
          return {
            success: true,
            data: paginated.data,
            meta: paginated.meta,
            requestId,
            timestamp,
          };
        }

        // Standard wrap for non-paginated data returns
        return {
          success: true,
          data: responsePayload as T,
          requestId,
          timestamp,
        };
      }),
    );
  }
}
