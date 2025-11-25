import { ROUTES } from '@/lib/routes';
import { useAuthStore } from '@/stores/authStore';
import type { PaginatedResponse, SuccessResponse } from '@/types';
import axios, { type AxiosResponse, type InternalAxiosRequestConfig, isAxiosError } from 'axios';
import { refreshTokenRequest } from './auth/request';

// Định nghĩa kiểu cho phản hồi của refreshTokenRequest
interface RefreshTokenResponse {
  token: string;
  refreshToken: string;
}

let refreshTokenPromise: Promise<string | null> | null = null;

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  },
});

const onRefreshToken = async (): Promise<string | null> => {
  const store = useAuthStore.getState();
  const refreshToken = store.refreshToken;

  if (!refreshToken) {
    store.clearAuth();
    return null;
  }

  try {
    const res: RefreshTokenResponse | null = await refreshTokenRequest(refreshToken);
    if (!res?.token || !res?.refreshToken) {
      store.clearAuth();
      return null;
    }
    store.setToken(res.token);
    store.setRefreshToken(res.refreshToken);
    return res.token;
  } catch (e: unknown) {
    if (isAxiosError(e)) {
      console.error('Refresh token error:', e.response?.data || e.message);
    } else {
      console.error('Refresh token error:', e);
    }
    store.clearAuth();
    window.location.href = ROUTES.HOME;
    return null;
  }
};

const handleError = async (error: unknown) => {
  if (!isAxiosError(error)) {
    console.error('Non-Axios error:', error);
    return Promise.reject(error);
  }

  const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
  const dataAxios = error.response;

  if (
    (dataAxios?.status === 401 || (dataAxios?.data as { meta?: { error?: string } })?.meta?.error === 'Unauthorized') &&
    !originalRequest._retry
  ) {
    originalRequest._retry = true;

    if (!refreshTokenPromise) {
      refreshTokenPromise = onRefreshToken();
    }

    try {
      const token = await refreshTokenPromise;
      refreshTokenPromise = null;

      if (token) {
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return instance(originalRequest);
      }
    } catch (e: unknown) {
      console.error('Error during token refresh:', e);
      refreshTokenPromise = null;
      return Promise.reject(error);
    }
  }

  const { data } = error.response || {};
  return Promise.reject(data?.data || data?.meta || error);
};

// Request interceptor
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = useAuthStore.getState().token;
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: unknown) => {
    if (isAxiosError(error)) {
      return Promise.reject(error);
    }
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);
// instance.interceptors.request.use((config) => {
//   if (typeof window !== "undefined") {
//     const token = localStorage.getItem("accessToken");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//   }
//   return config;
// });

// Response interceptor
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    const { statusCode } = response.data || {};
    if (statusCode === 200) {
      return response.data;
    }
    return response;
  },
  handleError
);

export default instance;

export const getSuccessResponse = <T>(data: AxiosResponse<SuccessResponse<T>>) => {
  return data.data.data;
};

export const getPaginatedResponse = <T>(data: AxiosResponse<PaginatedResponse<T>>) => {
  return {
    items: data.data.data.items,
    meta: data.data.data.meta,
  };
};
