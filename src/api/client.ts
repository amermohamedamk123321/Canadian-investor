/**
 * API Client Configuration
 * Centralized API endpoint and request handling
 */

// Determine API base URL based on environment
// In production: use /api (relative path works with reverse proxy on same domain)
// In development: use http://localhost:5000/api
const API_BASE_URL = import.meta.env.VITE_API_URL ||
  (import.meta.env.MODE === 'production' ? '/api' : 'http://localhost:5000/api');

export class APIError extends Error {
  constructor(
    public statusCode: number,
    message: string
  ) {
    super(message);
    this.name = 'APIError';
  }
}

/**
 * Generic fetch wrapper with error handling
 */
export async function fetchAPI<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  // Get JWT token from localStorage for authenticated requests
  const token = localStorage.getItem('adminToken');
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options?.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new APIError(
        response.status,
        errorData.error || `API Error: ${response.statusText}`
      );
    }

    return response.json();
  } catch (error) {
    // Handle network errors and other fetch failures
    if (error instanceof APIError) {
      throw error;
    }

    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error(`API request failed: ${url}`, error);

    throw new APIError(
      0,
      `Failed to reach API at ${url}. ${message}`
    );
  }
}

/**
 * GET request helper
 */
export function getRequest<T>(endpoint: string, options?: RequestInit): Promise<T> {
  return fetchAPI<T>(endpoint, {
    ...options,
    method: 'GET',
  });
}

/**
 * POST request helper
 */
export function postRequest<T>(
  endpoint: string,
  data?: unknown,
  options?: RequestInit
): Promise<T> {
  return fetchAPI<T>(endpoint, {
    ...options,
    method: 'POST',
    body: data ? JSON.stringify(data) : undefined,
  });
}

/**
 * PUT request helper
 */
export function putRequest<T>(
  endpoint: string,
  data?: unknown,
  options?: RequestInit
): Promise<T> {
  return fetchAPI<T>(endpoint, {
    ...options,
    method: 'PUT',
    body: data ? JSON.stringify(data) : undefined,
  });
}

/**
 * DELETE request helper
 */
export function deleteRequest<T>(endpoint: string, options?: RequestInit): Promise<T> {
  return fetchAPI<T>(endpoint, {
    ...options,
    method: 'DELETE',
  });
}
