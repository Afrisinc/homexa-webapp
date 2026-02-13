/**
 * Authentication API Service
 *
 * Handles user authentication and authorization
 */

import { apiClient } from '@/lib/api-client';
import { User } from '@/lib/types';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  role: 'buyer' | 'seller';
}

export interface ApiUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  tin?: string;
  companyName?: string;
  lastLogin?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken?: string;
}

export interface ApiAuthResponse {
  success: boolean;
  resp_msg: string;
  resp_code: number;
  data: {
    user: ApiUser;
    token: string;
    refreshToken?: string;
  };
}

/**
 * Normalize API user response to match User type
 */
function normalizeUser(apiUser: ApiUser): User {
  return {
    id: apiUser.id,
    email: apiUser.email,
    name: `${apiUser.firstName} ${apiUser.lastName}`.trim(),
    role: 'buyer', // Default to buyer, update based on API response
    sellerId: undefined,
  };
}

export const authService = {
  /**
   * Login user
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await apiClient.post<any>('/auth/login', credentials);

    // Handle both wrapped and unwrapped responses
    const data = response.data || response;

    if (!data.user || !data.token) {
      throw new Error('Invalid response format from login endpoint');
    }

    return {
      user: normalizeUser(data.user),
      token: data.token,
      refreshToken: data.refreshToken,
    };
  },

  /**
   * Register new user
   */
  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await apiClient.post<any>('/api/auth/register', data);

    const authData = response.data || response;

    if (!authData.user || !authData.token) {
      throw new Error('Invalid response format from register endpoint');
    }

    return {
      user: normalizeUser(authData.user),
      token: authData.token,
      refreshToken: authData.refreshToken,
    };
  },

  /**
   * Logout user
   */
  async logout(): Promise<void> {
    try {
      return await apiClient.post<void>('/api/auth/logout');
    } catch (error) {
      // Logout can fail silently if token is invalid
      console.warn('Logout request failed:', error);
    }
  },

  /**
   * Get current authenticated user
   */
  async getCurrentUser(): Promise<User> {
    const response = await apiClient.get<any>('/users/profile');

    const data = response.data || response;

    // Handle nested data format: { success, resp_msg, resp_code, data: { id, email, ... } }
    const user = data.data || data.user || data;

    if (user && user.id) {
      return normalizeUser(user);
    }

    throw new Error('Failed to fetch current user');
  },

  /**
   * Refresh access token
   */
  async refreshToken(refreshToken: string): Promise<AuthResponse> {
    const response = await apiClient.post<any>('/api/auth/refresh', { refreshToken });

    const data = response.data || response;

    if (!data.user || !data.token) {
      throw new Error('Invalid response format from refresh endpoint');
    }

    return {
      user: normalizeUser(data.user),
      token: data.token,
      refreshToken: data.refreshToken,
    };
  },

  /**
   * Request password reset
   */
  async requestPasswordReset(email: string): Promise<void> {
    return await apiClient.post<void>('/api/auth/password-reset', { email });
  },

  /**
   * Reset password with token
   */
  async resetPassword(token: string, newPassword: string): Promise<void> {
    return await apiClient.post<void>('/api/auth/password-reset/confirm', { token, newPassword });
  },
};
