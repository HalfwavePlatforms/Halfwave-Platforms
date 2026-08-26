import { Injectable, LoggerService, Scope } from '@nestjs/common';
import * as winston from 'winston';

@Injectable({ scope: Scope.TRANSIENT })
export class AppLogger implements LoggerService {
  private readonly logger: winston.Logger;

  constructor() {
    const isProduction = process.env.NODE_ENV === 'production';

    const formats = [
      winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      winston.format.errors({ stack: true }),
    ];

    if (isProduction) {
      formats.push(winston.format.json());
    } else {
      formats.push(
        winston.format.colorize(),
        winston.format.printf((info) => {
          const { timestamp, level, message, context, stack } = info;
          const tsStr = typeof timestamp === 'string' ? timestamp : '';
          const lvlStr = typeof level === 'string' ? level : '';
          const ctxStr =
            typeof context === 'string' && context ? `[${context}] ` : '';
          const msgStr =
            typeof message === 'string'
              ? message
              : typeof message === 'object' && message !== null
                ? JSON.stringify(message)
                : String(message);
          const stackStr =
            typeof stack === 'string' && stack ? `\n${stack}` : '';
          return `${tsStr} ${lvlStr}: ${ctxStr}${msgStr}${stackStr}`;
        }),
      );
    }

    this.logger = winston.createLogger({
      level: isProduction ? 'info' : 'debug',
      format: winston.format.combine(...formats),
      transports: [new winston.transports.Console()],
    });
  }

  log(message: unknown, context?: string) {
    const msgStr =
      typeof message === 'string' ? message : JSON.stringify(message);
    this.logger.info(msgStr, { context });
  }

  error(message: unknown, stack?: string, context?: string) {
    const msgStr =
      typeof message === 'string' ? message : JSON.stringify(message);
    this.logger.error(msgStr, { stack, context });
  }

  warn(message: unknown, context?: string) {
    const msgStr =
      typeof message === 'string' ? message : JSON.stringify(message);
    this.logger.warn(msgStr, { context });
  }

  debug(message: unknown, context?: string) {
    const msgStr =
      typeof message === 'string' ? message : JSON.stringify(message);
    this.logger.debug(msgStr, { context });
  }

  verbose(message: unknown, context?: string) {
    const msgStr =
      typeof message === 'string' ? message : JSON.stringify(message);
    this.logger.verbose(msgStr, { context });
  }
}
