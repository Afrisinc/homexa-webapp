/**
 * Categories API Service
 *
 * Handles product categories
 */

import { apiClient } from '@/lib/api-client';
import { Category } from '@/lib/types';

export interface CreateCategoryDto {
  name: string;
  icon?: string;
  slug: string;
}

export interface UpdateCategoryDto extends Partial<CreateCategoryDto> {}

export interface CategoriesResponse {
  success: boolean;
  resp_msg: string;
  resp_code: number;
  data: Category[];
}

export interface CategoryResponse {
  success: boolean;
  resp_msg: string;
  resp_code: number;
  data: Category;
}

export const categoriesService = {
  /**
   * Get all categories from the API
   */
  async getCategories(): Promise<Category[]> {
    try {
      const response = await apiClient.get<CategoriesResponse>('/api/categories');
      return response.data || [];
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  },

  /**
   * Get single category by ID
   */
  async getCategoryById(id: string): Promise<Category | null> {
    try {
      const response = await apiClient.get<CategoryResponse>(`/api/categories/${id}`);
      return response.data || null;
    } catch (error) {
      console.error(`Error fetching category ${id}:`, error);
      return null;
    }
  },

  /**
   * Get category by slug
   */
  async getCategoryBySlug(slug: string): Promise<Category | null> {
    try {
      const response = await apiClient.get<CategoryResponse>(`/api/categories/slug/${slug}`);
      return response.data || null;
    } catch (error) {
      console.error(`Error fetching category by slug ${slug}:`, error);
      return null;
    }
  },

  /**
   * Create category (admin only)
   */
  async createCategory(data: CreateCategoryDto): Promise<Category | null> {
    try {
      const response = await apiClient.post<CategoryResponse>('/api/categories', data);
      return response.data || null;
    } catch (error) {
      console.error('Error creating category:', error);
      return null;
    }
  },

  /**
   * Update category (admin only)
   */
  async updateCategory(id: string, data: UpdateCategoryDto): Promise<Category | null> {
    try {
      const response = await apiClient.patch<CategoryResponse>(`/api/categories/${id}`, data);
      return response.data || null;
    } catch (error) {
      console.error(`Error updating category ${id}:`, error);
      return null;
    }
  },

  /**
   * Delete category (admin only)
   */
  async deleteCategory(id: string): Promise<void> {
    try {
      await apiClient.delete<void>(`/api/categories/${id}`);
    } catch (error) {
      console.error(`Error deleting category ${id}:`, error);
    }
  },
};
