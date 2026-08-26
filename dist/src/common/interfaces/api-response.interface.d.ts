export interface ApiResponse<T> {
    success: true;
    data: T;
    meta?: Record<string, unknown>;
    requestId: string;
    timestamp: string;
}
export interface ApiErrorDetails {
    code: string;
    message: string;
    details?: unknown;
}
export interface ApiErrorResponse {
    success: false;
    error: ApiErrorDetails;
    requestId: string;
    timestamp: string;
}
