"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "@/lib/types";
import { authService } from "@/services/api";

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: async (email: string, password: string) => {
        try {
          const response = await authService.login({ email, password });

          if (response && response.user && response.token) {
            // Store token in localStorage for API requests
            localStorage.setItem('auth_token', response.token);

            set({
              user: response.user,
              token: response.token,
              isAuthenticated: true,
            });

            return true;
          }

          return false;
        } catch (error) {
          console.error('Login error:', error);
          return false;
        }
      },

      logout: async () => {
        try {
          await authService.logout();
        } catch (error) {
          console.error('Logout error:', error);
        } finally {
          // Remove token from localStorage
          localStorage.removeItem('auth_token');

          set({
            user: null,
            token: null,
            isAuthenticated: false,
          });
        }
      },

      setUser: (user) => {
        set({ user, isAuthenticated: !!user });
      },

      setToken: (token) => {
        if (token) {
          localStorage.setItem('auth_token', token);
        } else {
          localStorage.removeItem('auth_token');
        }
        set({ token });
      },

      initialize: async () => {
        // Try to restore token from localStorage
        const savedToken = localStorage.getItem('auth_token');

        if (savedToken) {
          try {
            const user = await authService.getCurrentUser();
            set({
              user,
              token: savedToken,
              isAuthenticated: true,
            });
          } catch (error) {
            console.error('Failed to restore session:', error);
            localStorage.removeItem('auth_token');
            set({
              user: null,
              token: null,
              isAuthenticated: false,
            });
          }
        }
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
