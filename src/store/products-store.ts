"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/lib/types";

interface ProductsState {
  products: Product[];
  addProduct: (product: Omit<Product, "id" | "createdAt" | "rating" | "reviewCount">) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  getProductById: (id: string) => Product | undefined;
  getProductsBySeller: (sellerId: string) => Product[];
}

export const useProductsStore = create<ProductsState>()(
  persist(
    (set, get) => ({
      products: [],

      addProduct: (productData) => {
        const newProduct: Product = {
          ...productData,
          id: `prod-${Date.now()}`,
          createdAt: new Date().toISOString(),
          rating: 0,
          reviewCount: 0,
        };

        set((state) => ({
          products: [...state.products, newProduct],
        }));
      },

      updateProduct: (id, updates) => {
        set((state) => ({
          products: state.products.map((p) =>
            p.id === id ? { ...p, ...updates } : p
          ),
        }));
      },

      deleteProduct: (id) => {
        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
        }));
      },

      getProductById: (id) => {
        return get().products.find((p) => p.id === id);
      },

      getProductsBySeller: (sellerId) => {
        return get().products.filter((p) => p.sellerId === sellerId);
      },
    }),
    {
      name: "products-storage",
    }
  )
);
