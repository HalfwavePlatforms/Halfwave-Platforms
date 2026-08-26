import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { randomUUID } from 'crypto';

@Injectable()
export class RequestIdMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Read tracing ID from incoming headers (if forwarded by api gateway) or generate a new one
    const requestId = (req.headers['x-request-id'] as string) || randomUUID();

    // Attach tracking ID to both request object and response header
    (req as unknown as { id: string }).id = requestId;
    res.setHeader('X-Request-Id', requestId);

    next();
  }
}
