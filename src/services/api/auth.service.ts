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

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken?: string;
}

export const authService = {
  /**
   * Login user
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    return apiClient.post<AuthResponse>('/auth/login', credentials);
  },

  /**
   * Register new user
   */
  async register(data: RegisterData): Promise<AuthResponse> {
    return apiClient.post<AuthResponse>('/auth/register', data);
  },

  /**
   * Logout user
   */
  async logout(): Promise<void> {
    return apiClient.post<void>('/auth/logout');
  },

  /**
   * Get current authenticated user
   */
  async getCurrentUser(): Promise<User> {
    return apiClient.get<User>('/auth/me');
  },

  /**
   * Refresh access token
   */
  async refreshToken(refreshToken: string): Promise<AuthResponse> {
    return apiClient.post<AuthResponse>('/auth/refresh', { refreshToken });
  },

  /**
   * Request password reset
   */
  async requestPasswordReset(email: string): Promise<void> {
    return apiClient.post<void>('/auth/password-reset', { email });
  },

  /**
   * Reset password with token
   */
  async resetPassword(token: string, newPassword: string): Promise<void> {
    return apiClient.post<void>('/auth/password-reset/confirm', { token, newPassword });
  },
};
