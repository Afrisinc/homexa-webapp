/**
 * Products API Service
 *
 * Handles all product-related API calls
 */

import { apiClient } from '@/lib/api-client';
import { Product, FilterOptions } from '@/lib/types';

export interface ApiProduct {
  id: string;
  name: string;
  slug: string;
  price: number;
  categoryId: string;
  sellerId: string;
  seller?: any;
  status: string;
  description: string;
  sku?: string;
  barcode?: string;
  compareAtPrice?: number;
  discountPercent?: number;
  currency: string;
  vendorId?: string | null;
  brand?: string | null;
  model?: string | null;
  stockQuantity?: number;
  stock?: number;
  allowBackorder?: boolean;
  warehouseLocation?: string;
  images: string[];
  videos?: string[];
  weight?: string;
  length?: string | null;
  width?: string | null;
  height?: string | null;
  attributes?: Record<string, any>;
  visibility?: boolean;
  returnable?: boolean;
  isFeatured?: boolean;
  taxRate?: number;
  tags?: string[];
  metaTitle?: string;
  metaDescription?: string;
  seoKeywords?: string[];
  rating?: number;
  reviewCount?: number;
  condition?: 'new' | 'used' | 'refurbished';
  shipping?: {
    free: boolean;
    estimatedDays: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface ProductsResponse {
  success?: boolean;
  resp_msg?: string;
  resp_code?: number;
  data: Product[];
  total?: number;
  page?: number;
  pageSize?: number;
}

export interface SingleProductResponse {
  success?: boolean;
  resp_msg?: string;
  resp_code?: number;
  data: ApiProduct;
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

/**
 * Normalize API seller to Seller type
 */
function normalizeSeller(apiSeller: any): any {
  if (!apiSeller) return undefined;

  return {
    id: apiSeller.id,
    firstName: apiSeller.firstName,
    lastName: apiSeller.lastName,
    email: apiSeller.email,
    role: apiSeller.role,
    phone: apiSeller.phone,
    companyName: apiSeller.companyName,
    avatar: apiSeller.avatar || undefined,
    rating: apiSeller.rating || 0,
    totalSales: apiSeller.totalSales || 0,
    responseRate: apiSeller.responseRate || 0,
    verified: apiSeller.verified ?? true,
    location: apiSeller.location,
    description: apiSeller.description,
    // Helper properties for UI
    name: `${apiSeller.firstName} ${apiSeller.lastName}`.trim(),
  };
}

/**
 * Normalize API product response to match Product type
 */
function normalizeProduct(apiProduct: ApiProduct): Product {
  return {
    id: apiProduct.id,
    name: apiProduct.name,
    slug: apiProduct.slug,
    price: apiProduct.price,
    categoryId: apiProduct.categoryId,
    sellerId: apiProduct.sellerId,
    seller: apiProduct.seller ? normalizeSeller(apiProduct.seller) : undefined,
    status: (apiProduct.status as "active" | "inactive" | "archived") || "active",
    description: apiProduct.description,
    sku: apiProduct.sku || '',
    barcode: apiProduct.barcode || '',
    compareAtPrice: apiProduct.compareAtPrice || 0,
    discountPercent: apiProduct.discountPercent || 0,
    currency: apiProduct.currency,
    vendorId: apiProduct.vendorId || '',
    brand: apiProduct.brand || 'Unknown',
    model: apiProduct.model || 'Unknown',
    stockQuantity: apiProduct.stockQuantity || apiProduct.stock || 0,
    allowBackorder: apiProduct.allowBackorder ?? false,
    warehouseLocation: apiProduct.warehouseLocation || '',
    images: apiProduct.images || [],
    videos: apiProduct.videos || [],
    weight: apiProduct.weight || '',
    length: apiProduct.length,
    width: apiProduct.width,
    height: apiProduct.height,
    attributes: apiProduct.attributes || {},
    visibility: apiProduct.visibility ?? true,
    returnable: apiProduct.returnable ?? false,
    isFeatured: apiProduct.isFeatured ?? false,
    taxRate: apiProduct.taxRate || 0,
    tags: apiProduct.tags || [],
    metaTitle: apiProduct.metaTitle || '',
    metaDescription: apiProduct.metaDescription || '',
    seoKeywords: apiProduct.seoKeywords || [],
    createdAt: apiProduct.createdAt,
    updatedAt: apiProduct.updatedAt,
    rating: apiProduct.rating || 0,
    reviewCount: apiProduct.reviewCount || 0,
    condition: apiProduct.condition || 'new',
    shipping: apiProduct.shipping || { free: false, estimatedDays: 5 },
    stock: apiProduct.stockQuantity || apiProduct.stock || 0,
  } as Product;
}

export const productsService = {
  /**
   * Get all products with optional filtering
   */
  async getProducts(filters?: FilterOptions): Promise<ProductsResponse> {
    const response = await apiClient.get<any>('/api/products', {
      params: filters as Record<string, string | number | boolean | undefined>,
    });

    // Normalize products if they come from API with different structure
    if (response.data && Array.isArray(response.data)) {
      return {
        ...response,
        data: response.data.map((p: any) => normalizeProduct(p)),
      };
    }

    return response;
  },

  /**
   * Get single product by ID
   */
  async getProductById(id: string): Promise<Product> {
    const response = await apiClient.get<any>(`/api/products/${id}`);

    // Handle both wrapped and unwrapped responses
    const apiProduct = response.data || response;
    return normalizeProduct(apiProduct);
  },

  /**
   * Get products by seller
   */
  async getProductsBySeller(sellerId: string, filters?: FilterOptions): Promise<ProductsResponse> {
    const response = await apiClient.get<any>(`/api/products/seller/${sellerId}`, {
      params: filters as Record<string, string | number | boolean | undefined>,
    });

    // Normalize products
    if (response.data && Array.isArray(response.data)) {
      return {
        ...response,
        data: response.data.map((p: any) => normalizeProduct(p)),
      };
    }

    return response;
  },

  /**
   * Create new product (seller only)
   */
  async createProduct(data: CreateProductDto): Promise<Product> {
    const response = await apiClient.post<any>('/api/products', data);
    const apiProduct = response.data || response;
    return normalizeProduct(apiProduct);
  },

  /**
   * Update product (seller only)
   */
  async updateProduct(id: string, data: UpdateProductDto): Promise<Product> {
    const response = await apiClient.patch<any>(`/products/${id}`, data);
    const apiProduct = response.data || response;
    return normalizeProduct(apiProduct);
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
    const response = await apiClient.get<any>('/products', {
      params: { q: query, ...filters } as Record<string, string | number | boolean | undefined>,
    });

    // Normalize products
    if (response.data && Array.isArray(response.data)) {
      return {
        ...response,
        data: response.data.map((p: any) => normalizeProduct(p)),
      };
    }

    return response;
  },
};
