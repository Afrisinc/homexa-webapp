/**
 * Shopping Cart API Service
 *
 * Handles cart operations
 */

import { apiClient } from '@/lib/api-client';
import { Product } from '@/lib/types';

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  price: number;
  currency: string;
  addedAt: string;
}

export interface Cart {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  currency: string;
  updatedAt: string;
}

export interface AddToCartDto {
  productId: string;
  quantity: number;
}

export interface UpdateCartItemDto {
  quantity: number;
}

export const cartService = {
  /**
   * Get user's cart
   */
  async getCart(): Promise<Cart> {
    return apiClient.get<Cart>('/cart');
  },

  /**
   * Add item to cart
   */
  async addToCart(data: AddToCartDto): Promise<Cart> {
    return apiClient.post<Cart>('/cart/items', data);
  },

  /**
   * Update cart item quantity
   */
  async updateCartItem(itemId: string, data: UpdateCartItemDto): Promise<Cart> {
    return apiClient.patch<Cart>(`/cart/items/${itemId}`, data);
  },

  /**
   * Remove item from cart
   */
  async removeFromCart(itemId: string): Promise<Cart> {
    return apiClient.delete<Cart>(`/cart/items/${itemId}`);
  },

  /**
   * Clear entire cart
   */
  async clearCart(): Promise<void> {
    return apiClient.delete<void>('/cart');
  },

  /**
   * Get cart item count
   */
  async getCartCount(): Promise<{ count: number }> {
    return apiClient.get<{ count: number }>('/cart/count');
  },
};
