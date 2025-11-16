/**
 * Conversations/Messages API Service
 *
 * Handles chat and messaging between buyers and sellers
 */

import { apiClient } from '@/lib/api-client';
import { Conversation, Message } from '@/lib/types';

export interface CreateConversationDto {
  productId: string;
  sellerId: string;
  initialMessage?: string;
}

export interface SendMessageDto {
  content: string;
}

export interface ConversationsResponse {
  conversations: Conversation[];
  total: number;
  unreadCount: number;
}

export const conversationsService = {
  /**
   * Get user's conversations
   */
  async getConversations(userId?: string): Promise<ConversationsResponse> {
    return apiClient.get<ConversationsResponse>('/conversations', {
      params: { userId },
    });
  },

  /**
   * Get single conversation by ID
   */
  async getConversationById(id: string): Promise<Conversation> {
    return apiClient.get<Conversation>(`/conversations/${id}`);
  },

  /**
   * Create new conversation
   */
  async createConversation(data: CreateConversationDto): Promise<Conversation> {
    return apiClient.post<Conversation>('/conversations', data);
  },

  /**
   * Send message in conversation
   */
  async sendMessage(conversationId: string, data: SendMessageDto): Promise<Message> {
    return apiClient.post<Message>(`/conversations/${conversationId}/messages`, data);
  },

  /**
   * Mark message as read
   */
  async markMessageAsRead(messageId: string): Promise<void> {
    return apiClient.patch<void>(`/messages/${messageId}/read`);
  },

  /**
   * Mark all messages in conversation as read
   */
  async markConversationAsRead(conversationId: string): Promise<void> {
    return apiClient.patch<void>(`/conversations/${conversationId}/read`);
  },

  /**
   * Get unread message count
   */
  async getUnreadCount(): Promise<{ count: number }> {
    return apiClient.get<{ count: number }>('/conversations/unread-count');
  },
};
