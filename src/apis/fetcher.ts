import { ApiError } from './ApiError';
import { ERROR_CODES } from './errorCodes';

export interface FetcherOptions extends RequestInit {
  timeout?: number;
}

export async function fetcher<T = unknown>(
  input: RequestInfo,
  options?: FetcherOptions
): Promise<T> {
  const { timeout = 10000, ...fetchOptions } = options || {};
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  let res: Response;
  try {
    res = await fetch(input, { ...fetchOptions, signal: controller.signal });
  } catch (e) {
    clearTimeout(id);
    if (e instanceof Error && e.name === 'AbortError') {
      throw new ApiError('Request timeout', ERROR_CODES.TIMEOUT);
    }
    throw new ApiError('Network error', ERROR_CODES.NETWORK);
  }
  clearTimeout(id);

  if (!res.ok) {
    let code: keyof typeof ERROR_CODES = 'UNKNOWN';
    switch (res.status) {
      case 401:
        code = 'UNAUTHORIZED';
        break;
      case 403:
        code = 'FORBIDDEN';
        break;
      case 404:
        code = 'NOT_FOUND';
        break;
      case 500:
        code = 'SERVER';
        break;
    }
    throw new ApiError(res.statusText, ERROR_CODES[code], res.status);
  }

  const contentType = res.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return res.json();
  }
  return res.text() as unknown as T;
}
