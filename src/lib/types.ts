// Core type definitions for the marketplace

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  categoryId: string;
  sellerId: string;
  seller?: Seller;
  status: "active" | "inactive" | "archived";
  description: string;
  sku: string;
  barcode: string;
  compareAtPrice: number;
  discountPercent: number;
  currency: string;
  vendorId: string;
  brand: string;
  model: string;
  stockQuantity: number;
  stock: number; // Alias for stockQuantity (used in UI)
  allowBackorder: boolean;
  warehouseLocation: string;
  images: string[];
  videos: string[];
  weight: string;
  length: string | null;
  width: string | null;
  height: string | null;
  attributes: Record<string, any>;
  visibility: boolean;
  returnable: boolean;
  isFeatured: boolean;
  taxRate: number;
  tags: string[];
  metaTitle: string;
  metaDescription: string;
  seoKeywords: string[];
  createdAt: string;
  updatedAt: string;
  // Fields with defaults provided by API normalization
  rating: number;
  reviewCount: number;
  condition: "new" | "used" | "refurbished";
  shipping: {
    free: boolean;
    estimatedDays: number;
  };
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  status: "active" | "inactive";
  icon?: string; // For backward compatibility with old format
  image?: {
    url: string;
    alt_text: string;
  };
  seo?: {
    meta_title: string;
    meta_description: string;
    keywords: string[];
  };
  metadata?: {
    display_order: number;
    is_featured: boolean;
  };
  description?: string;
  parent_id?: string | null;
  children?: Category[];
  createdAt?: string;
  updatedAt?: string;
}

export interface Seller {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: "SELLER" | "BUYER" | "ADMIN";
  phone: string;
  avatar?: string;
  rating?: number;
  totalSales?: number;
  responseRate?: number;
  verified?: boolean;
  location?: string;
  createdAt?: string;
  description?: string;
  businessType?: "wholesaler" | "retailer" | "manufacturer";
  certifications?: string[];
  // Computed property for display
  name?: string;
  companyName?: string;
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
