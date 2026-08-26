import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AppLogger } from '../logger/logger.service';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: AppLogger) {}

  use(req: Request, res: Response, next: NextFunction) {
    const { method, ip } = req;
    const url = req.originalUrl || req.url;
    const userAgent = req.get('user-agent') || 'Unknown User-Agent';
    const requestId = (req as unknown as { id?: string }).id || 'N/A';

    // Log the request arrival
    this.logger.log(
      `[Request ID: ${requestId}] Incoming Request: ${method} ${url} - Client IP: ${ip} - UA: ${userAgent}`,
      'RequestLoggerMiddleware',
    );

    next();
  }
}
