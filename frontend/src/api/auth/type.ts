import type { z } from 'zod';
import type {
  ForgotPasswordRequestSchema,
  LoginRequestSchema,
  LoginResponseSchema,
  RegisterEmployerRequestSchema,
  RegisterEmployerResponseSchema,
  RegisterRequestSchema,
  RegisterResponseSchema,
  ResetPasswordRequestSchema,
  ResetPasswordTokenParamSchema,
  // SocialLoginRequestSchema,
} from './schema';

export type LoginRequest = z.infer<typeof LoginRequestSchema>;
// export type SocialLoginRequest = z.infer<typeof SocialLoginRequestSchema>;
export type RegisterRequest = z.infer<typeof RegisterRequestSchema>;
export type RegisterEmployerRequest = z.infer<typeof RegisterEmployerRequestSchema>;
export type RegisterEmployerResponse = z.infer<typeof RegisterEmployerResponseSchema>;
export type RegisterResponse = z.infer<typeof RegisterResponseSchema>;
export type ForgotPasswordRequest = z.infer<typeof ForgotPasswordRequestSchema>;
export type ResetPasswordRequest = z.infer<typeof ResetPasswordRequestSchema>;
export type LoginResponse = z.infer<typeof LoginResponseSchema>;
export type ResetPasswordTokenParam = z.infer<typeof ResetPasswordTokenParamSchema>;
