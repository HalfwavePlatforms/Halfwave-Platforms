export interface ApiResponse<T> {
  success: true;
  data: T;
  meta?: Record<string, unknown>;
  requestId: string;
  timestamp: string;
}

export interface ApiErrorDetails {
  code: string; // Machine-readable uppercase identifier (e.g., 'NOT_FOUND', 'VALIDATION_FAILED')
  message: string; // Human-readable summary
  details?: unknown; // Fine-grained error arrays (like validation failure reasons)
}

export interface ApiErrorResponse {
  success: false;
  error: ApiErrorDetails;
  requestId: string;
  timestamp: string;
}
