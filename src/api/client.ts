/**
 * API Client Configuration
 * Centralized API endpoint and request handling
 */

// Determine API base URL
// Priority: VITE_API_URL env var > detect from current host > default fallback
function getAPIBaseURL(): string {
  // 1. Use environment variable if set
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }

  // 2. Check if we're on localhost - use port 5000 for local dev
  if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
    return 'http://localhost:5000/api';
  }

  // 3. Otherwise, use relative /api path (works with reverse proxy on any domain)
  return '/api';
}

const API_BASE_URL = getAPIBaseURL();
console.log('[API Client] Using API base URL:', API_BASE_URL);

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
    console.log(`[API] Requesting: ${options?.method || 'GET'} ${url}`);

    const response = await fetch(url, {
      ...options,
      headers,
    });

    console.log(`[API] Response status: ${response.status} ${response.statusText}`);

    if (!response.ok) {
      let errorMessage = '';
      let errorData = {};
      let responseText = '';

      try {
        responseText = await response.text();
        console.log('[API] Raw error response:', responseText);

        if (responseText) {
          errorData = JSON.parse(responseText);
          console.log('[API] Parsed error data:', errorData);
        }
      } catch (e) {
        console.log('[API] Could not parse error response:', e);
      }

      // Build error message with all available info
      if (errorData.error) {
        errorMessage = errorData.error;
      } else if (errorData.message) {
        errorMessage = errorData.message;
      } else if (response.statusText) {
        errorMessage = `${response.status} ${response.statusText}`;
      } else {
        errorMessage = `HTTP Error ${response.status}`;
      }

      console.error(`[API] Error (${response.status}):`, {
        url,
        status: response.status,
        statusText: response.statusText,
        message: errorMessage,
        data: errorData,
        rawText: responseText
      });
      throw new APIError(response.status, errorMessage);
    }

    const data = await response.json();
    console.log(`[API] Success: received data`);
    return data;
  } catch (error) {
    // Handle network errors and other fetch failures
    if (error instanceof APIError) {
      throw error;
    }

    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error(`[API] Request failed: ${url}`, error);

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
