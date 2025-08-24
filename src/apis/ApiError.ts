import type { ErrorCode } from './errorCodes';

export class ApiError extends Error {
  code: ErrorCode;
  status?: number;
  constructor(message: string, code: ErrorCode, status?: number) {
    super(message);
    this.name = 'ApiError';
    this.code = code;
    this.status = status;
  }
}
