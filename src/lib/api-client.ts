/**
 * API Client - Centralized HTTP client for all API requests
 *
 * This provides a consistent interface for making API calls with:
 * - Automatic error handling
 * - Request/response interceptors
 * - TypeScript support
 * - Easy to swap between fetch and axios
 */

export class ApiError extends Error {
  constructor(
    public status: number,
    public statusText: string,
    message: string,
    public data?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

interface RequestConfig extends RequestInit {
  params?: Record<string, string | number | boolean | undefined>;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = '/api') {
    this.baseUrl = baseUrl;
  }

  /**
   * Build URL with query parameters
   */
  private buildUrl(endpoint: string, params?: Record<string, any>): string {
    const url = new URL(`${this.baseUrl}${endpoint}`, window.location.origin);

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          url.searchParams.append(key, String(value));
        }
      });
    }

    return url.toString();
  }

  /**
   * Handle API response
   */
  private async handleResponse<T>(response: Response): Promise<T> {
    const contentType = response.headers.get('content-type');
    const isJson = contentType?.includes('application/json');

    let data: any;
    try {
      data = isJson ? await response.json() : await response.text();
    } catch (error) {
      data = null;
    }

    if (!response.ok) {
      throw new ApiError(
        response.status,
        response.statusText,
        data?.message || data?.error || 'An error occurred',
        data
      );
    }

    return data as T;
  }

  /**
   * GET request
   */
  async get<T>(endpoint: string, config?: RequestConfig): Promise<T> {
    const url = this.buildUrl(endpoint, config?.params);

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...config?.headers,
      },
      ...config,
    });

    return this.handleResponse<T>(response);
  }

  /**
   * POST request
   */
  async post<T>(endpoint: string, data?: any, config?: RequestConfig): Promise<T> {
    const url = this.buildUrl(endpoint, config?.params);

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...config?.headers,
      },
      body: data ? JSON.stringify(data) : undefined,
      ...config,
    });

    return this.handleResponse<T>(response);
  }

  /**
   * PUT request
   */
  async put<T>(endpoint: string, data?: any, config?: RequestConfig): Promise<T> {
    const url = this.buildUrl(endpoint, config?.params);

    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...config?.headers,
      },
      body: data ? JSON.stringify(data) : undefined,
      ...config,
    });

    return this.handleResponse<T>(response);
  }

  /**
   * PATCH request
   */
  async patch<T>(endpoint: string, data?: any, config?: RequestConfig): Promise<T> {
    const url = this.buildUrl(endpoint, config?.params);

    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...config?.headers,
      },
      body: data ? JSON.stringify(data) : undefined,
      ...config,
    });

    return this.handleResponse<T>(response);
  }

  /**
   * DELETE request
   */
  async delete<T>(endpoint: string, config?: RequestConfig): Promise<T> {
    const url = this.buildUrl(endpoint, config?.params);

    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...config?.headers,
      },
      ...config,
    });

    return this.handleResponse<T>(response);
  }

  /**
   * Upload file(s)
   */
  async upload<T>(endpoint: string, formData: FormData, config?: RequestConfig): Promise<T> {
    const url = this.buildUrl(endpoint, config?.params);

    const response = await fetch(url, {
      method: 'POST',
      body: formData,
      ...config,
      // Don't set Content-Type header - browser will set it with boundary
      headers: {
        ...config?.headers,
      },
    });

    return this.handleResponse<T>(response);
  }
}

// Export singleton instance
export const apiClient = new ApiClient();
