// Core type definitions for the marketplace

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  images: string[];
  rating: number;
  reviewCount: number;
  categoryId: string;
  brand: string;
  model: string;
  sellerId: string;
  stock: number;
  createdAt: string;
  condition?: "new" | "used" | "refurbished";
  shipping?: {
    free: boolean;
    estimatedDays: number;
  };
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  slug: string;
}

export interface Seller {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  totalSales: number;
  responseRate: number;
  verified: boolean;
  location?: string;
  createdAt?: string;
  description?: string;
  businessType?: "wholesaler" | "retailer" | "manufacturer";
  certifications?: string[];
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderType: "user" | "seller";
  content: string;
  timestamp: string;
  read: boolean;
}

export interface Conversation {
  id: string;
  productId: string;
  sellerId: string;
  userId: string;
  messages: Message[];
  lastMessageAt: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: "buyer" | "seller";
  sellerId?: string; // Reference to seller profile if role is seller
}

export interface FilterOptions {
  priceMin?: number;
  priceMax?: number;
  currency?: string;
  brand?: string;
  model?: string;
  categoryId?: string;
  q?: string;
  verifiedSellersOnly?: boolean;
  location?: string;
  availability?: "all" | "in-stock" | "out-of-stock";
}
