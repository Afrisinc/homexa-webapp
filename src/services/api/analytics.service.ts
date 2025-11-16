/**
 * Analytics API Service
 *
 * Handles seller analytics and statistics
 */

import { apiClient } from '@/lib/api-client';

export interface SalesAnalytics {
  totalRevenue: number;
  totalOrders: number;
  averageOrderValue: number;
  salesByDate: Array<{
    date: string;
    revenue: number;
    orders: number;
  }>;
}

export interface ProductAnalytics {
  topSellingProducts: Array<{
    productId: string;
    productName: string;
    unitsSold: number;
    revenue: number;
  }>;
  lowStockProducts: Array<{
    productId: string;
    productName: string;
    currentStock: number;
  }>;
}

export interface CustomerAnalytics {
  totalCustomers: number;
  newCustomers: number;
  returningCustomers: number;
  customersByLocation: Array<{
    city: string;
    country: string;
    count: number;
  }>;
}

export interface RevenueAnalytics {
  daily: Array<{ date: string; revenue: number }>;
  weekly: Array<{ week: string; revenue: number }>;
  monthly: Array<{ month: string; revenue: number }>;
}

export const analyticsService = {
  /**
   * Get sales analytics
   */
  async getSalesAnalytics(
    sellerId: string,
    startDate?: string,
    endDate?: string
  ): Promise<SalesAnalytics> {
    return apiClient.get<SalesAnalytics>(`/analytics/sales`, {
      params: { sellerId, startDate, endDate },
    });
  },

  /**
   * Get product analytics
   */
  async getProductAnalytics(sellerId: string): Promise<ProductAnalytics> {
    return apiClient.get<ProductAnalytics>(`/analytics/products`, {
      params: { sellerId },
    });
  },

  /**
   * Get customer analytics
   */
  async getCustomerAnalytics(
    sellerId: string,
    startDate?: string,
    endDate?: string
  ): Promise<CustomerAnalytics> {
    return apiClient.get<CustomerAnalytics>(`/analytics/customers`, {
      params: { sellerId, startDate, endDate },
    });
  },

  /**
   * Get revenue analytics
   */
  async getRevenueAnalytics(
    sellerId: string,
    period: 'daily' | 'weekly' | 'monthly',
    startDate?: string,
    endDate?: string
  ): Promise<RevenueAnalytics> {
    return apiClient.get<RevenueAnalytics>(`/analytics/revenue`, {
      params: { sellerId, period, startDate, endDate },
    });
  },
};
