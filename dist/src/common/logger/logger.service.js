"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppLogger = void 0;
const common_1 = require("@nestjs/common");
const winston = __importStar(require("winston"));
let AppLogger = class AppLogger {
    logger;
    constructor() {
        const isProduction = process.env.NODE_ENV === 'production';
        const formats = [
            winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            winston.format.errors({ stack: true }),
        ];
        if (isProduction) {
            formats.push(winston.format.json());
        }
        else {
            formats.push(winston.format.colorize(), winston.format.printf((info) => {
                const { timestamp, level, message, context, stack } = info;
                const tsStr = typeof timestamp === 'string' ? timestamp : '';
                const lvlStr = typeof level === 'string' ? level : '';
                const ctxStr = typeof context === 'string' && context ? `[${context}] ` : '';
                const msgStr = typeof message === 'string'
                    ? message
                    : typeof message === 'object' && message !== null
                        ? JSON.stringify(message)
                        : String(message);
                const stackStr = typeof stack === 'string' && stack ? `\n${stack}` : '';
                return `${tsStr} ${lvlStr}: ${ctxStr}${msgStr}${stackStr}`;
            }));
        }
        this.logger = winston.createLogger({
            level: isProduction ? 'info' : 'debug',
            format: winston.format.combine(...formats),
            transports: [new winston.transports.Console()],
        });
    }
    log(message, context) {
        const msgStr = typeof message === 'string' ? message : JSON.stringify(message);
        this.logger.info(msgStr, { context });
    }
    error(message, stack, context) {
        const msgStr = typeof message === 'string' ? message : JSON.stringify(message);
        this.logger.error(msgStr, { stack, context });
    }
    warn(message, context) {
        const msgStr = typeof message === 'string' ? message : JSON.stringify(message);
        this.logger.warn(msgStr, { context });
    }
    debug(message, context) {
        const msgStr = typeof message === 'string' ? message : JSON.stringify(message);
        this.logger.debug(msgStr, { context });
    }
    verbose(message, context) {
        const msgStr = typeof message === 'string' ? message : JSON.stringify(message);
        this.logger.verbose(msgStr, { context });
    }
};
exports.AppLogger = AppLogger;
exports.AppLogger = AppLogger = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.TRANSIENT }),
    __metadata("design:paramtypes", [])
], AppLogger);
//# sourceMappingURL=logger.service.js.map