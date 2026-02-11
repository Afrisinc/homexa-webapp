"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface CartState {
  items: CartItem[];
  itemCount: number;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      itemCount: 0,

      addItem: (newItem: CartItem) => {
        set((state) => {
          const existingItem = state.items.find((item) => item.id === newItem.id);

          if (existingItem) {
            // Update quantity if item already exists
            const updatedItems = state.items.map((item) =>
              item.id === newItem.id
                ? { ...item, quantity: item.quantity + newItem.quantity }
                : item
            );
            return {
              items: updatedItems,
              itemCount: updatedItems.reduce((sum, item) => sum + item.quantity, 0),
            };
          }

          // Add new item
          const updatedItems = [...state.items, newItem];
          return {
            items: updatedItems,
            itemCount: updatedItems.reduce((sum, item) => sum + item.quantity, 0),
          };
        });
      },

      removeItem: (id: string) => {
        set((state) => {
          const updatedItems = state.items.filter((item) => item.id !== id);
          return {
            items: updatedItems,
            itemCount: updatedItems.reduce((sum, item) => sum + item.quantity, 0),
          };
        });
      },

      updateQuantity: (id: string, quantity: number) => {
        set((state) => {
          if (quantity <= 0) {
            // Remove item if quantity is 0 or less
            const updatedItems = state.items.filter((item) => item.id !== id);
            return {
              items: updatedItems,
              itemCount: updatedItems.reduce((sum, item) => sum + item.quantity, 0),
            };
          }

          const updatedItems = state.items.map((item) =>
            item.id === id ? { ...item, quantity } : item
          );
          return {
            items: updatedItems,
            itemCount: updatedItems.reduce((sum, item) => sum + item.quantity, 0),
          };
        });
      },

      clearCart: () => {
        set({
          items: [],
          itemCount: 0,
        });
      },
    }),
    {
      name: "cart-storage",
    }
  )
);
