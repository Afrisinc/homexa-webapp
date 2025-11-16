/**
 * Reviews API Service
 *
 * Handles product reviews and ratings
 */

import { apiClient } from '@/lib/api-client';

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number; // 1-5
  title: string;
  comment: string;
  helpful: number;
  verified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateReviewDto {
  rating: number;
  title: string;
  comment: string;
}

export interface UpdateReviewDto {
  rating?: number;
  title?: string;
  comment?: string;
}

export interface ReviewsResponse {
  reviews: Review[];
  total: number;
  averageRating: number;
  ratingDistribution: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };
}

export const reviewsService = {
  /**
   * Get product reviews
   */
  async getProductReviews(productId: string, page?: number, pageSize?: number): Promise<ReviewsResponse> {
    return apiClient.get<ReviewsResponse>(`/products/${productId}/reviews`, {
      params: { page, pageSize },
    });
  },

  /**
   * Create review
   */
  async createReview(productId: string, data: CreateReviewDto): Promise<Review> {
    return apiClient.post<Review>(`/products/${productId}/reviews`, data);
  },

  /**
   * Update review
   */
  async updateReview(reviewId: string, data: UpdateReviewDto): Promise<Review> {
    return apiClient.patch<Review>(`/reviews/${reviewId}`, data);
  },

  /**
   * Delete review
   */
  async deleteReview(reviewId: string): Promise<void> {
    return apiClient.delete<void>(`/reviews/${reviewId}`);
  },

  /**
   * Mark review as helpful
   */
  async markReviewHelpful(reviewId: string): Promise<Review> {
    return apiClient.post<Review>(`/reviews/${reviewId}/helpful`);
  },
};
