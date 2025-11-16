/**
 * useApi Hook
 *
 * Generic hook for API calls with loading, error, and data states
 *
 * Usage:
 * const { data, loading, error, execute } = useApi(productsService.getProducts);
 */

import { useState, useCallback } from 'react';
import { ApiError } from '@/lib/api-client';

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: ApiError | Error | null;
}

interface UseApiReturn<T, Args extends any[]> extends UseApiState<T> {
  execute: (...args: Args) => Promise<T | null>;
  reset: () => void;
}

export function useApi<T, Args extends any[] = []>(
  apiFunction: (...args: Args) => Promise<T>,
  options?: {
    onSuccess?: (data: T) => void;
    onError?: (error: ApiError | Error) => void;
    executeOnMount?: boolean;
    executeOnMountArgs?: Args;
  }
): UseApiReturn<T, Args> {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (...args: Args): Promise<T | null> => {
      setState({ data: null, loading: true, error: null });

      try {
        const result = await apiFunction(...args);
        setState({ data: result, loading: false, error: null });

        if (options?.onSuccess) {
          options.onSuccess(result);
        }

        return result;
      } catch (error) {
        const err = error instanceof ApiError ? error : new Error(String(error));
        setState({ data: null, loading: false, error: err });

        if (options?.onError) {
          options.onError(err);
        }

        return null;
      }
    },
    [apiFunction, options]
  );

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return {
    ...state,
    execute,
    reset,
  };
}
