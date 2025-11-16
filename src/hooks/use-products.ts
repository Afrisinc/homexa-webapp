/**
 * Products Hooks
 *
 * Ready-to-use hooks for product operations
 */

import { useState, useEffect } from 'react';
import { productsService, ProductsResponse } from '@/services/api';
import { Product, FilterOptions } from '@/lib/types';
import { useApi } from './use-api';

/**
 * Hook to fetch products with filters
 */
export function useProducts(filters?: FilterOptions) {
  const { data, loading, error, execute } = useApi(productsService.getProducts);

  useEffect(() => {
    execute(filters);
  }, [execute, JSON.stringify(filters)]);

  return {
    products: data?.products || [],
    total: data?.total || 0,
    loading,
    error,
    refetch: () => execute(filters),
  };
}

/**
 * Hook to fetch single product by ID
 */
export function useProduct(id: string) {
  const { data, loading, error, execute } = useApi(productsService.getProductById);

  useEffect(() => {
    if (id) {
      execute(id);
    }
  }, [execute, id]);

  return {
    product: data,
    loading,
    error,
    refetch: () => execute(id),
  };
}

/**
 * Hook for product mutations (create, update, delete)
 */
export function useProductMutations() {
  const createProduct = useApi(productsService.createProduct);
  const updateProduct = useApi(productsService.updateProduct);
  const deleteProduct = useApi(productsService.deleteProduct);

  return {
    create: createProduct,
    update: updateProduct,
    delete: deleteProduct,
  };
}

/**
 * Hook to search products
 */
export function useProductSearch(initialQuery: string = '') {
  const [query, setQuery] = useState(initialQuery);
  const { data, loading, error, execute } = useApi(productsService.searchProducts);

  useEffect(() => {
    if (query) {
      const timeoutId = setTimeout(() => {
        execute(query);
      }, 300); // Debounce search

      return () => clearTimeout(timeoutId);
    }
  }, [query, execute]);

  return {
    products: data?.products || [],
    total: data?.total || 0,
    loading,
    error,
    query,
    setQuery,
    search: (searchQuery: string) => execute(searchQuery),
  };
}
