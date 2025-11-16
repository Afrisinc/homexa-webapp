/**
 * Users API Service
 *
 * Handles user profile management
 */

import { apiClient } from '@/lib/api-client';
import { User } from '@/lib/types';

export interface UpdateUserDto {
  name?: string;
  email?: string;
  avatar?: string;
  phone?: string;
  address?: {
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state?: string;
    postalCode: string;
    country: string;
  };
}

export interface ChangePasswordDto {
  currentPassword: string;
  newPassword: string;
}

export const usersService = {
  /**
   * Get user profile by ID
   */
  async getUserById(id: string): Promise<User> {
    return apiClient.get<User>(`/users/${id}`);
  },

  /**
   * Update user profile
   */
  async updateUser(id: string, data: UpdateUserDto): Promise<User> {
    return apiClient.patch<User>(`/users/${id}`, data);
  },

  /**
   * Upload user avatar
   */
  async uploadAvatar(id: string, file: File): Promise<{ avatarUrl: string }> {
    const formData = new FormData();
    formData.append('avatar', file);

    return apiClient.upload<{ avatarUrl: string }>(`/users/${id}/avatar`, formData);
  },

  /**
   * Change password
   */
  async changePassword(id: string, data: ChangePasswordDto): Promise<void> {
    return apiClient.post<void>(`/users/${id}/change-password`, data);
  },

  /**
   * Delete user account
   */
  async deleteUser(id: string): Promise<void> {
    return apiClient.delete<void>(`/users/${id}`);
  },
};
