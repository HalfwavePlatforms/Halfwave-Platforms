import { LoggerService } from '@nestjs/common';
export declare class AppLogger implements LoggerService {
    private readonly logger;
    constructor();
    log(message: unknown, context?: string): void;
    error(message: unknown, stack?: string, context?: string): void;
    warn(message: unknown, context?: string): void;
    debug(message: unknown, context?: string): void;
    verbose(message: unknown, context?: string): void;
}
