import type { UserResponse } from '@/api/user/type';
import { createSelectorHooks } from 'auto-zustand-selectors-hook';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  user: UserResponse | null;
  token: string | null;
  refreshToken: string | null;
  setToken: (token: string) => void;
  setRefreshToken: (refreshToken: string) => void;
  setUser: (user: UserResponse) => void;
  clearAuth: () => void;
}

const useAuthStoreBase = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      refreshToken: null,
      setToken: (token) => set({ token }),
      setRefreshToken: (refreshToken) => set({ refreshToken }),
      setUser: (user) => set({ user }),
      clearAuth: () => set({ user: null, token: null, refreshToken: null }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user, token: state.token, refreshToken: state.refreshToken }),
    }
  )
);

export const useAuthStore = createSelectorHooks(useAuthStoreBase);
