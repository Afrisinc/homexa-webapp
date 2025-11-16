import { Conversation } from "@/lib/types";

export const conversations: Conversation[] = [
  {
    id: "conv-1",
    productId: "prod-1",
    sellerId: "seller-1",
    userId: "user-1",
    lastMessageAt: "2024-11-15T14:30:00Z",
    messages: [
      {
        id: "msg-1",
        conversationId: "conv-1",
        senderId: "user-1",
        senderType: "user",
        content: "Hi, is this phone still available?",
        timestamp: "2024-11-15T14:20:00Z",
        read: true,
      },
      {
        id: "msg-2",
        conversationId: "conv-1",
        senderId: "seller-1",
        senderType: "seller",
        content:
          "Yes, it is! We have 45 units in stock. Would you like to know anything specific about it?",
        timestamp: "2024-11-15T14:25:00Z",
        read: true,
      },
      {
        id: "msg-3",
        conversationId: "conv-1",
        senderId: "user-1",
        senderType: "user",
        content: "Does it come with the original accessories?",
        timestamp: "2024-11-15T14:30:00Z",
        read: false,
      },
    ],
  },
  {
    id: "conv-2",
    productId: "prod-3",
    sellerId: "seller-1",
    userId: "user-1",
    lastMessageAt: "2024-11-14T10:15:00Z",
    messages: [
      {
        id: "msg-4",
        conversationId: "conv-2",
        senderId: "user-1",
        senderType: "user",
        content: "Can you offer a discount if I buy two pairs?",
        timestamp: "2024-11-14T10:00:00Z",
        read: true,
      },
      {
        id: "msg-5",
        conversationId: "conv-2",
        senderId: "seller-1",
        senderType: "seller",
        content:
          "Absolutely! For two units, I can offer 15% off. That brings the total to $678.30 for both.",
        timestamp: "2024-11-14T10:15:00Z",
        read: true,
      },
    ],
  },
];
