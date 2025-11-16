/**
 * Authentication Hooks
 *
 * Ready-to-use hooks for authentication
 */

import { useCallback } from 'react';
import { authService, LoginCredentials, RegisterData } from '@/services/api';
import { useAuthStore } from '@/store/auth-store';
import { useApi } from './use-api';

/**
 * Hook for authentication operations
 */
export function useAuth() {
  const { user, isAuthenticated, login: loginStore, logout: logoutStore } = useAuthStore();

  const loginApi = useApi(authService.login);
  const registerApi = useApi(authService.register);
  const logoutApi = useApi(authService.logout);

  const login = useCallback(
    async (credentials: LoginCredentials) => {
      const result = await loginApi.execute(credentials);
      if (result) {
        loginStore(result.user, result.token);
      }
      return result;
    },
    [loginApi.execute, loginStore]
  );

  const register = useCallback(
    async (data: RegisterData) => {
      const result = await registerApi.execute(data);
      if (result) {
        loginStore(result.user, result.token);
      }
      return result;
    },
    [registerApi.execute, loginStore]
  );

  const logout = useCallback(async () => {
    await logoutApi.execute();
    logoutStore();
  }, [logoutApi.execute, logoutStore]);

  return {
    user,
    isAuthenticated,
    login,
    register,
    logout,
    loginState: {
      loading: loginApi.loading,
      error: loginApi.error,
    },
    registerState: {
      loading: registerApi.loading,
      error: registerApi.error,
    },
  };
}
