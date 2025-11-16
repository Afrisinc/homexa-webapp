/**
 * Shopping Cart Hooks
 *
 * Ready-to-use hooks for cart operations
 */

import { useState, useEffect, useCallback } from 'react';
import { cartService, Cart } from '@/services/api';
import { useApi } from './use-api';

/**
 * Hook to manage shopping cart
 */
export function useCart() {
  const { data: cart, loading, error, execute: fetchCart } = useApi(cartService.getCart);
  const addItem = useApi(cartService.addToCart);
  const updateItem = useApi(cartService.updateCartItem);
  const removeItem = useApi(cartService.removeFromCart);
  const clearCartApi = useApi(cartService.clearCart);

  // Fetch cart on mount
  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const addToCart = useCallback(
    async (productId: string, quantity: number = 1) => {
      const result = await addItem.execute({ productId, quantity });
      if (result) {
        await fetchCart(); // Refresh cart
      }
      return result;
    },
    [addItem.execute, fetchCart]
  );

  const updateQuantity = useCallback(
    async (itemId: string, quantity: number) => {
      const result = await updateItem.execute(itemId, { quantity });
      if (result) {
        await fetchCart(); // Refresh cart
      }
      return result;
    },
    [updateItem.execute, fetchCart]
  );

  const removeFromCart = useCallback(
    async (itemId: string) => {
      const result = await removeItem.execute(itemId);
      if (result) {
        await fetchCart(); // Refresh cart
      }
      return result;
    },
    [removeItem.execute, fetchCart]
  );

  const clearCart = useCallback(async () => {
    await clearCartApi.execute();
    await fetchCart(); // Refresh cart
  }, [clearCartApi.execute, fetchCart]);

  return {
    cart,
    loading,
    error,
    itemCount: cart?.items.length || 0,
    total: cart?.total || 0,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    refetch: fetchCart,
  };
}

/**
 * Hook to get cart count (lightweight for navbar badge)
 */
export function useCartCount() {
  const { data, loading, error, execute } = useApi(cartService.getCartCount);

  useEffect(() => {
    execute();
  }, [execute]);

  return {
    count: data?.count || 0,
    loading,
    error,
    refetch: execute,
  };
}
