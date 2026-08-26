"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalValidationPipe = void 0;
const common_1 = require("@nestjs/common");
function formatValidationErrors(errors) {
    const formatted = {};
    for (const error of errors) {
        const property = error.property;
        if (error.constraints) {
            formatted[property] = Object.values(error.constraints);
        }
        else if (error.children && error.children.length > 0) {
            formatted[property] = formatValidationErrors(error.children);
        }
    }
    return formatted;
}
exports.globalValidationPipe = new common_1.ValidationPipe({
    whitelist: true,
    transform: true,
    forbidNonWhitelisted: true,
    transformOptions: {
        enableImplicitConversion: true,
    },
    exceptionFactory: (errors) => {
        const errorDetails = formatValidationErrors(errors);
        return new common_1.BadRequestException({
            message: 'Input parameters validation failed.',
            error: 'BAD_REQUEST',
            details: errorDetails,
        });
    },
});
//# sourceMappingURL=validation.pipe.js.map