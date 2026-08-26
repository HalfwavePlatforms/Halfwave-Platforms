import {
  ValidationPipe,
  ValidationError,
  BadRequestException,
} from '@nestjs/common';

/**
 * Format validation error objects recursively to build a clean field-to-constraints dictionary.
 */
function formatValidationErrors(
  errors: ValidationError[],
): Record<string, unknown> {
  const formatted: Record<string, unknown> = {};

  for (const error of errors) {
    const property = error.property;

    if (error.constraints) {
      formatted[property] = Object.values(error.constraints);
    } else if (error.children && error.children.length > 0) {
      // Recursively parse nested objects (like properties inside sub-DTOs)
      formatted[property] = formatValidationErrors(error.children);
    }
  }

  return formatted;
}

/**
 * Production-ready global ValidationPipe configured to strip unmapped parameters,
 * auto-transform inputs to match type signatures, and return structured field-level error details.
 */
export const globalValidationPipe = new ValidationPipe({
  // Strip any properties not declared in the validation DTO
  whitelist: true,
  // Automatically convert path/query parameters (strings) to match their TypeScript definitions (numbers, booleans)
  transform: true,
  // Throw an error if clients send unmapped properties (strict mode)
  forbidNonWhitelisted: true,
  transformOptions: {
    enableImplicitConversion: true,
  },
  // Custom error handler formatting messages to match our ApiErrorResponse schema
  exceptionFactory: (errors: ValidationError[]) => {
    const errorDetails = formatValidationErrors(errors);
    return new BadRequestException({
      message: 'Input parameters validation failed.',
      error: 'BAD_REQUEST',
      details: errorDetails,
    });
  },
});
