import instance, { getSuccessResponse } from '../axios';
import type {
  LoginRequest,
  LoginResponse,
  RegisterEmployerRequest,
  RegisterEmployerResponse,
  RegisterRequest,
  RegisterResponse,
  // SocialLoginRequest,
} from './type';

export const loginRequest = async (data: LoginRequest) => {
  const response = await instance.post('/auth/login', data);
  return getSuccessResponse<LoginResponse>(response);
};

// export const socialLoginRequest = async (data: SocialLoginRequest) => {
//   const response = await instance.post('/auth/social-login', data);
//   return getSuccessResponse<LoginResponse>(response);
// };

export const registerRequest = async (data: RegisterRequest) => {
  const response = await instance.post('/auth/register', data);
  return getSuccessResponse<RegisterResponse>(response);
};

export const registerEmployerRequest = async (data: RegisterEmployerRequest) => {
  const response = await instance.post('/auth/register-employer', data);
  return getSuccessResponse<RegisterEmployerResponse>(response);
}
export const logoutRequest = async ({ refreshToken }: { refreshToken: string }) => {
  const response = await instance.post('/auth/logout', { refreshToken });
  return getSuccessResponse<null>(response);
};

// export const logoutAllRequest = async () => {
//   const response = await instance.post('/auth/logout-all');
//   return getSuccessResponse<null>(response);
// };

export const refreshTokenRequest = async (refreshToken: string) => {
  const response = await instance.post('/auth/refresh', { refreshToken });
  return getSuccessResponse<{ token: string; refreshToken: string }>(response);
};

// export const forgotPasswordRequest = async (data: ForgotPasswordRequest) => {
//   const response = await instance.post('/auth/forgot-password', data);
//   return getSuccessResponse<{ email: string; expiresAt: number; userId: string; token: string }>(response);
// };

// export const resetPasswordRequest = async ({
//   userId,
//   token,
//   ...data
// }: ResetPasswordTokenParam & ResetPasswordRequest) => {
//   const response = await instance.post(`/auth/reset-password/${userId}/${token}`, data);
//   return getSuccessResponse<UserResponseData>(response);
// };

// export const verifyTokenRequest = async (userId: string, token: string) => {
//   const response = await instance.get(`/auth/verify-token/${userId}/${token}`);
//   return getSuccessResponse<{ expiresAt: number }>(response);
// };


