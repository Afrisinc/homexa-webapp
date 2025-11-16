/**
 * Orders Hooks
 *
 * Ready-to-use hooks for order operations
 */

import { useState, useEffect, useCallback } from 'react';
import { ordersService, Order, CreateOrderDto } from '@/services/api';
import { useApi } from './use-api';

/**
 * Hook to fetch user's orders
 */
export function useOrders(page?: number, pageSize?: number) {
  const { data, loading, error, execute } = useApi(ordersService.getOrders);

  useEffect(() => {
    execute(page, pageSize);
  }, [execute, page, pageSize]);

  return {
    orders: data?.orders || [],
    total: data?.total || 0,
    loading,
    error,
    refetch: () => execute(page, pageSize),
  };
}

/**
 * Hook to fetch single order by ID
 */
export function useOrder(id: string) {
  const { data, loading, error, execute } = useApi(ordersService.getOrderById);

  useEffect(() => {
    if (id) {
      execute(id);
    }
  }, [execute, id]);

  return {
    order: data,
    loading,
    error,
    refetch: () => execute(id),
  };
}

/**
 * Hook for order mutations (create, update status, cancel)
 */
export function useOrderMutations() {
  const createOrder = useApi(ordersService.createOrder);
  const updateStatus = useApi(ordersService.updateOrderStatus);
  const cancelOrder = useApi(ordersService.cancelOrder);

  return {
    create: createOrder,
    updateStatus,
    cancel: cancelOrder,
  };
}

/**
 * Hook to fetch seller's orders
 */
export function useSellerOrders(sellerId: string, page?: number, pageSize?: number) {
  const { data, loading, error, execute } = useApi(ordersService.getSellerOrders);

  useEffect(() => {
    if (sellerId) {
      execute(sellerId, page, pageSize);
    }
  }, [execute, sellerId, page, pageSize]);

  return {
    orders: data?.orders || [],
    total: data?.total || 0,
    loading,
    error,
    refetch: () => execute(sellerId, page, pageSize),
  };
}
