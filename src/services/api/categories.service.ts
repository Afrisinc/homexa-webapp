/**
 * Categories API Service
 *
 * Handles product categories
 */

import { apiClient } from '@/lib/api-client';
import { Category } from '@/lib/types';

export interface CreateCategoryDto {
  name: string;
  icon: string;
  slug: string;
}

export interface UpdateCategoryDto extends Partial<CreateCategoryDto> {}

export const categoriesService = {
  /**
   * Get all categories
   */
  async getCategories(): Promise<Category[]> {
    return apiClient.get<Category[]>('/categories');
  },

  /**
   * Get single category by ID
   */
  async getCategoryById(id: string): Promise<Category> {
    return apiClient.get<Category>(`/categories/${id}`);
  },

  /**
   * Get category by slug
   */
  async getCategoryBySlug(slug: string): Promise<Category> {
    return apiClient.get<Category>(`/categories/slug/${slug}`);
  },

  /**
   * Create category (admin only)
   */
  async createCategory(data: CreateCategoryDto): Promise<Category> {
    return apiClient.post<Category>('/categories', data);
  },

  /**
   * Update category (admin only)
   */
  async updateCategory(id: string, data: UpdateCategoryDto): Promise<Category> {
    return apiClient.patch<Category>(`/categories/${id}`, data);
  },

  /**
   * Delete category (admin only)
   */
  async deleteCategory(id: string): Promise<void> {
    return apiClient.delete<void>(`/categories/${id}`);
  },
};
