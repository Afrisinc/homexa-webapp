/**
 * Orders API Service
 *
 * Handles order management and checkout
 */

import { apiClient } from '@/lib/api-client';
import { Product } from '@/lib/types';

export interface OrderItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  price: number;
  currency: string;
}

export interface ShippingAddress {
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state?: string;
  postalCode: string;
  country: string;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  currency: string;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  trackingNumber?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrderDto {
  items: Array<{ productId: string; quantity: number }>;
  shippingAddress: ShippingAddress;
  paymentMethodId?: string;
}

export interface OrdersResponse {
  orders: Order[];
  total: number;
  page?: number;
  pageSize?: number;
}

export const ordersService = {
  /**
   * Get user's orders
   */
  async getOrders(page?: number, pageSize?: number): Promise<OrdersResponse> {
    return apiClient.get<OrdersResponse>('/orders', {
      params: { page, pageSize },
    });
  },

  /**
   * Get single order by ID
   */
  async getOrderById(id: string): Promise<Order> {
    return apiClient.get<Order>(`/orders/${id}`);
  },

  /**
   * Create order (checkout)
   */
  async createOrder(data: CreateOrderDto): Promise<Order> {
    return apiClient.post<Order>('/orders', data);
  },

  /**
   * Update order status (seller only)
   */
  async updateOrderStatus(
    id: string,
    status: Order['status'],
    trackingNumber?: string
  ): Promise<Order> {
    return apiClient.patch<Order>(`/orders/${id}`, { status, trackingNumber });
  },

  /**
   * Cancel order
   */
  async cancelOrder(id: string): Promise<Order> {
    return apiClient.patch<Order>(`/orders/${id}/cancel`);
  },

  /**
   * Get seller's orders
   */
  async getSellerOrders(sellerId: string, page?: number, pageSize?: number): Promise<OrdersResponse> {
    return apiClient.get<OrdersResponse>(`/orders/seller/${sellerId}`, {
      params: { page, pageSize },
    });
  },
};
