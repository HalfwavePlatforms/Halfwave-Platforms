import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AppLogger } from '../logger/logger.service';
export declare class RequestLoggerMiddleware implements NestMiddleware {
    private readonly logger;
    constructor(logger: AppLogger);
    use(req: Request, res: Response, next: NextFunction): void;
}
