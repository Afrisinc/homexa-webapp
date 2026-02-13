/**
 * Sellers API Service
 *
 * Handles seller profiles and statistics
 */

import { apiClient } from '@/lib/api-client';
import { Seller } from '@/lib/types';

export interface PaginationMeta {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface SellersResponse {
  data: Seller[];
  pagination?: PaginationMeta;
}

export interface SellerStats {
  totalSales: number;
  totalRevenue: number;
  totalProducts: number;
  averageRating: number;
  responseRate: number;
  responseTime: number; // in hours
}

export interface UpdateSellerDto {
  name?: string;
  avatar?: string;
  bio?: string;
  phone?: string;
  address?: string;
}

export const sellersService = {
  /**
   * Get all sellers with pagination
   */
  async getSellers(page: number = 1, limit: number = 10): Promise<SellersResponse> {
    try {
      const response = await apiClient.get<any>('/api/sellers', {
        params: { page, limit },
      });

      // Handle both wrapped and unwrapped responses
      const data = response.data || response;

      return {
        data: Array.isArray(data.data) ? data.data : [],
        pagination: data.pagination,
      };
    } catch (error) {
      console.error('Failed to fetch sellers:', error);
      return { data: [] };
    }
  },

  /**
   * Get single seller by ID
   */
  async getSellerById(id: string): Promise<Seller | null> {
    try {
      const response = await apiClient.get<any>(`/api/sellers/${id}`);

      // Handle both wrapped and unwrapped responses
      const data = response.data || response;
      return data.data || data;
    } catch (error) {
      console.error('Failed to fetch seller:', error);
      return null;
    }
  },

  /**
   * Get seller statistics
   */
  async getSellerStats(id: string): Promise<SellerStats | null> {
    try {
      const response = await apiClient.get<any>(`/api/sellers/${id}/stats`);

      // Handle both wrapped and unwrapped responses
      const data = response.data || response;
      return data.data || data;
    } catch (error) {
      console.error('Failed to fetch seller stats:', error);
      return null;
    }
  },

  /**
   * Update seller profile
   */
  async updateSeller(id: string, data: UpdateSellerDto): Promise<Seller | null> {
    try {
      const response = await apiClient.patch<any>(`/api/sellers/${id}`, data);

      // Handle both wrapped and unwrapped responses
      const responseData = response.data || response;
      return responseData.data || responseData;
    } catch (error) {
      console.error('Failed to update seller:', error);
      return null;
    }
  },

  /**
   * Upload seller avatar
   */
  async uploadAvatar(id: string, file: File): Promise<{ avatarUrl: string } | null> {
    try {
      const formData = new FormData();
      formData.append('avatar', file);

      const response = await apiClient.upload<any>(`/api/sellers/${id}/avatar`, formData);

      // Handle both wrapped and unwrapped responses
      const data = response.data || response;
      return data.data || data;
    } catch (error) {
      console.error('Failed to upload avatar:', error);
      return null;
    }
  },
};
