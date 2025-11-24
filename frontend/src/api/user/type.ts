// import type { z } from 'zod';
// import type {
//   UserCreateInputSchema,
//   UserFilterSchema,
//   UserIdParamSchema,
//   UserResponseDataSchema,
//   UserUpdateInputSchema,
// } from './schema';

// export type UserFilter = z.infer<typeof UserFilterSchema>;
// export type UserCreateInput = z.infer<typeof UserCreateInputSchema>;
// export type UserUpdateInput = z.infer<typeof UserUpdateInputSchema>;
// export type UserResponseData = z.infer<typeof UserResponseDataSchema>;
// export type UserIdParam = z.infer<typeof UserIdParamSchema>;
import type { z } from 'zod';
import type {
  CreateUserSchema,
  UpdateUserSchema,
  UserResponseSchema,
  UsersListQuerySchema,
  UsersListResponseSchema,
} from './schema';

export type CreateUser = z.infer<typeof CreateUserSchema>;
export type UpdateUser = z.infer<typeof UpdateUserSchema>;
export type UserResponse = z.infer<typeof UserResponseSchema>;
export type UsersListQuery = z.infer<typeof UsersListQuerySchema>;
export type UsersListResponse = z.infer<typeof UsersListResponseSchema>;

