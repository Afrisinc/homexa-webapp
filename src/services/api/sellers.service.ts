/**
 * Sellers API Service
 *
 * Handles seller profiles and statistics
 */

import { apiClient } from '@/lib/api-client';
import { Seller } from '@/lib/types';

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
   * Get all sellers
   */
  async getSellers(): Promise<Seller[]> {
    return apiClient.get<Seller[]>('/sellers');
  },

  /**
   * Get single seller by ID
   */
  async getSellerById(id: string): Promise<Seller> {
    return apiClient.get<Seller>(`/sellers/${id}`);
  },

  /**
   * Get seller statistics
   */
  async getSellerStats(id: string): Promise<SellerStats> {
    return apiClient.get<SellerStats>(`/sellers/${id}/stats`);
  },

  /**
   * Update seller profile
   */
  async updateSeller(id: string, data: UpdateSellerDto): Promise<Seller> {
    return apiClient.patch<Seller>(`/sellers/${id}`, data);
  },

  /**
   * Upload seller avatar
   */
  async uploadAvatar(id: string, file: File): Promise<{ avatarUrl: string }> {
    const formData = new FormData();
    formData.append('avatar', file);

    return apiClient.upload<{ avatarUrl: string }>(`/sellers/${id}/avatar`, formData);
  },
};
