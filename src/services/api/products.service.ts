/**
 * Products API Service
 *
 * Handles all product-related API calls
 */

import { apiClient } from '@/lib/api-client';
import { Product, FilterOptions } from '@/lib/types';

export interface ProductsResponse {
  products: Product[];
  total: number;
  page?: number;
  pageSize?: number;
}

export interface CreateProductDto {
  title: string;
  description: string;
  price: number;
  currency: string;
  images: string[];
  categoryId: string;
  brand: string;
  model: string;
  stock: number;
  condition?: 'new' | 'used' | 'refurbished';
  shipping?: {
    free: boolean;
    estimatedDays: number;
  };
}

export interface UpdateProductDto extends Partial<CreateProductDto> {}

export const productsService = {
  /**
   * Get all products with optional filtering
   */
  async getProducts(filters?: FilterOptions): Promise<ProductsResponse> {
    return apiClient.get<ProductsResponse>('/products', {
      params: filters as Record<string, string | number | boolean | undefined>,
    });
  },

  /**
   * Get single product by ID
   */
  async getProductById(id: string): Promise<Product> {
    return apiClient.get<Product>(`/products/${id}`);
  },

  /**
   * Get products by seller
   */
  async getProductsBySeller(sellerId: string, filters?: FilterOptions): Promise<ProductsResponse> {
    return apiClient.get<ProductsResponse>(`/products/seller/${sellerId}`, {
      params: filters as Record<string, string | number | boolean | undefined>,
    });
  },

  /**
   * Create new product (seller only)
   */
  async createProduct(data: CreateProductDto): Promise<Product> {
    return apiClient.post<Product>('/products', data);
  },

  /**
   * Update product (seller only)
   */
  async updateProduct(id: string, data: UpdateProductDto): Promise<Product> {
    return apiClient.patch<Product>(`/products/${id}`, data);
  },

  /**
   * Delete product (seller only)
   */
  async deleteProduct(id: string): Promise<void> {
    return apiClient.delete<void>(`/products/${id}`);
  },

  /**
   * Search products
   */
  async searchProducts(query: string, filters?: FilterOptions): Promise<ProductsResponse> {
    return apiClient.get<ProductsResponse>('/products', {
      params: { q: query, ...filters } as Record<string, string | number | boolean | undefined>,
    });
  },
};
