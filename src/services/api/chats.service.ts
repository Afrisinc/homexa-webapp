/**
 * Chats API Service
 *
 * Handles all chat and messaging API calls
 */

import { apiClient } from '@/lib/api-client';
import { Chat, Message } from '@/lib/types';

export interface ApiMessage {
  id: string;
  senderId: string;
  senderName: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  productId: string;
  attachments?: string[];
}

export interface ApiChat {
  id: string;
  participantId: string;
  participantName: string;
  participantRole: string;
  participantAvatar?: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  productId: string;
  productName: string;
  productImage: string;
  productPrice: number;
  productSlug: string;
  messages: ApiMessage[];
  createdAt: string;
  updatedAt: string;
}

export interface ChatsResponse {
  success?: boolean;
  resp_msg?: string;
  resp_code?: number;
  data: Chat[];
}

export interface ChatResponse {
  success?: boolean;
  resp_msg?: string;
  resp_code?: number;
  data: Chat;
}

export interface MessageResponse {
  success?: boolean;
  resp_msg?: string;
  resp_code?: number;
  data: Message;
}

export interface SendMessageRequest {
  chatId: string;
  product_id: string;
  content: string;
  attachments?: string[];
}

/**
 * Normalize API message to Message type
 */
function normalizeMessage(apiMessage: ApiMessage): Message {
  return {
    id: apiMessage.id,
    senderId: apiMessage.senderId,
    senderName: apiMessage.senderName,
    content: apiMessage.message,
    timestamp: apiMessage.timestamp,
    isRead: apiMessage.isRead,
    productId: apiMessage.productId,
    attachments: apiMessage.attachments || [],
  };
}

/**
 * Normalize API chat to Chat type
 */
function normalizeChat(apiChat: ApiChat): Chat {
  return {
    id: apiChat.id,
    participantId: apiChat.participantId,
    participantName: apiChat.participantName,
    participantRole: apiChat.participantRole,
    participantAvatar: apiChat.participantAvatar,
    lastMessage: apiChat.lastMessage,
    lastMessageTime: apiChat.lastMessageTime,
    unreadCount: apiChat.unreadCount,
    productId: apiChat.productId,
    productName: apiChat.productName,
    productImage: apiChat.productImage,
    productPrice: apiChat.productPrice,
    productSlug: apiChat.productSlug,
    messages: apiChat.messages?.map(normalizeMessage) ?? [],
    createdAt: apiChat.createdAt,
    updatedAt: apiChat.updatedAt,
  };
}

export const chatsService = {
  /**
   * Get all chats for current user
   */
  async getChats(): Promise<Chat[]> {
    try {
      const response = await apiClient.get<any>('/api/chats');

      // Handle both wrapped and unwrapped responses
      const data = response.data || response;

      if (Array.isArray(data)) {
        return data.map(normalizeChat);
      }

      return [];
    } catch (error) {
      console.error('Failed to fetch chats:', error);
      return [];
    }
  },

  /**
   * Get single chat with all messages
   * @param idOrProductId - Chat ID for existing chats or Product ID for new chats
   * @param isProductId - Set to true if using product_id instead of chatId (optional)
   */
  async getChat(idOrProductId: string, isProductId: boolean = false): Promise<Chat | null> {
    try {
      const params = isProductId
        ? { product_id: idOrProductId }
        : { chatId: idOrProductId };

      const response = await apiClient.get<any>(`/api/chats/messages`, {
        params,
      });

      // Handle both wrapped and unwrapped responses
      const data = response.data || response;
      return normalizeChat(data);
    } catch (error) {
      console.error('Failed to fetch chat:', error);
      return null;
    }
  },

  /**
   * Send message in chat
   * @param chatIdOrProductId - Chat ID for existing chats, or Product ID for new chats
   * @param content - Message content
   * @param attachments - Optional attachments
   * @param isExistingChat - Whether this is an existing chat (true) or new chat (false)
   */
  async sendMessage(
    chatIdOrProductId: string,
    content: string,
    attachments?: string[],
    isExistingChat: boolean = false
  ): Promise<Message | null> {
    try {
      const payload: Record<string, any> = {
        content,
        attachments: attachments || [],
      };

      // Use chatId for existing chats, product_id for new chats
      if (isExistingChat) {
        payload.chatId = chatIdOrProductId;
      } else {
        payload.product_id = chatIdOrProductId;
      }

      console.log('Sending message to API:', {
        endpoint: '/api/chats/messages',
        payload,
        isExistingChat,
      });

      const response = await apiClient.post<any>('/api/chats/messages', payload);

      console.log('Message API response:', response);

      // Handle both wrapped and unwrapped responses
      const data = response.data || response;

      if (!data || !data.id) {
        console.error('Invalid message data returned:', data);
        return null;
      }

      return normalizeMessage(data);
    } catch (error) {
      console.error('Failed to send message:', {
        error,
        errorMessage: error instanceof Error ? error.message : String(error),
        chatIdOrProductId,
        isExistingChat,
      });
      return null;
    }
  },

  /**
   * Mark messages as read in chat
   */
  async markAsRead(chatId: string): Promise<boolean> {
    try {
      await apiClient.post<void>('/api/chats/messages/read', { chatId });
      return true;
    } catch (error) {
      console.error('Failed to mark messages as read:', error);
      return false;
    }
  },
};
