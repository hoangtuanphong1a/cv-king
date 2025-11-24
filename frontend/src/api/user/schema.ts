// import { MESSAGES } from '@/lib/messages';
// import { RoleEnum } from '@/enums/role';
// import { z } from 'zod';

// export const UserAttributesSchema = z.object({
//   attributes: z
//     .object({
//       username: z.string().optional(),
//       email: z.string().email({ message: MESSAGES.INVALID_EMAIL }).optional(),
//       phone_number: z.string().optional(),
//       full_name: z.string().optional(),
//     })
//     .refine((data) => Object.values(data).some((val) => val !== undefined), {
//       message: MESSAGES.AT_LEAST_ONE_ATTRIBUTE_REQUIRED,
//     }),
//   operator: z.enum(['AND', 'OR']).optional().default('AND'),
// });

// export const UserFilterSchema = z.object({
//   email: z.string().email({ message: MESSAGES.INVALID_EMAIL }).optional(),
//   username: z.string().min(3, { message: MESSAGES.USERNAME_TOO_SHORT }).optional(),
//   full_name: z.string().optional(),
//   phone_number: z.string().optional(),
//   sort_by_name: z.enum(['asc', 'desc']).optional(),
//   sort_by_date: z.enum(['newest', 'oldest']).optional(),
//   limit: z.coerce.number().int().positive().optional(),
//   offset: z.coerce.number().int().nonnegative().optional(),
//   search: z.string().optional(),
// });

// export const UserCreateInputSchema = z.object({
//   username: z.string().min(3, { message: MESSAGES.USERNAME_TOO_SHORT }),
//   email: z.string().email({ message: MESSAGES.INVALID_EMAIL }),
//   password: z.string().min(6, { message: MESSAGES.PASSWORD_TOO_SHORT }),
//   full_name: z.string().nullable(),
//   phone_number: z.string().nullable(),
//   day_of_birth: z.string().nullable(),
//   gender: z.boolean().optional(),
//   avatar: z.string().optional(),
//   roles: z.string().optional().default(RoleEnum.USER),
//   is_public: z.boolean().optional().default(true),
//   is_activated: z.boolean().optional().default(true),
// });

// export const UserUpdateInputSchema = z
//   .object({
//     two_factor_enabled: z.boolean().optional(),
//   })
//   .merge(UserCreateInputSchema);

// export const UserResponseDataSchema = z.object({
//   uuid: z.string().uuid(),
//   username: z.string(),
//   full_name: z.string().nullable(),
//   email: z.string().email(),
//   phone_number: z.string().nullable(),
//   day_of_birth: z.string().nullable(),
//   is_public: z.boolean(),
//   is_deleted: z.boolean(),
//   gender: z.boolean().nullable(),
//   roles: z.string(),
//   avatar: z.string().nullable(),
//   created_at: z.string().or(z.date()),
//   updated_at: z.string().or(z.date()),
//   provider: z.enum(['email', 'google', 'facebook']).optional().default('email'),
//   provider_id: z.string().nullable().optional(),
//   orders: z.array(z.any()).optional(),
//   cart_items: z.array(z.any()).optional(),
//   reviews: z.array(z.any()).optional(),
//   conversations: z.array(z.any()).optional(),
//   shops: z
//     .array(
//       z.object({
//         name: z.string(),
//         uuid: z.string().uuid().optional(),
//       })
//     )
//     .optional(),
// });

// export const UserIdParamSchema = z.object({
//   userId: z.string().uuid({ message: MESSAGES.INVALID_UUID }),
// });

// export const UserLocationResponseSchema = z.object({
//   lat: z.string(),
//   lon: z.string(),
//   region: z.string(),
//   provinceId: z.number(),
//   regionId: z.number(),
//   provinceName: z.string(),
//   address: z.object({
//     amenity: z.string(),
//     house_number: z.string(),
//     road: z.string(),
//     quarter: z.string(),
//     suburb: z.string(),
//     city_district: z.string(),
//     village: z.string(),
//     city: z.string(),
//     postcode: z.string(),
//     country: z.string(),
//     country_code: z.string(),
//   }),
// });

import { z } from 'zod';
import { MESSAGES } from '@/lib/messages';

// Base fields aligned with backend DTO/entity (password excluded from safe responses)
export const UserBaseSchema = z.object({
  id: z.string().uuid({ message: MESSAGES.INVALID_UUID }).optional(),
  email: z.string().email({ message: MESSAGES.INVALID_EMAIL }),
  username: z.string().optional(),
  displayName: z.string().optional(),
  roles: z.array(z.string()),
  avatarUrl: z.string().optional(),
  preferredLocale: z.string().optional(),
  isEmailConfirmed: z.boolean().optional(),
  isActive: z.boolean().optional(),
  isDeleted: z.boolean().optional(),
  lastLoginAt: z.string().datetime().nullish(),
  createdAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime().optional(),
  googleId: z.string().optional(),
  linkedInId: z.string().optional(),
});

// Create & Update payloads (password allowed for create/update)
export const CreateUserSchema = UserBaseSchema.extend({
  password: z.string().min(6, { message: MESSAGES.PASSWORD_TOO_SHORT }).optional(),
}).omit({ id: true, createdAt: true, updatedAt: true, lastLoginAt: true });

export const UpdateUserSchema = CreateUserSchema.partial();

// Safe user returned from API (no password / refreshToken)
export const UserResponseSchema = UserBaseSchema;

// List & query helpers
export const UsersListQuerySchema = z.object({
  page: z.number().int().positive().optional(),
  limit: z.number().int().positive().optional(),
  q: z.string().optional(),
});

export const UsersListResponseSchema = z.object({
  items: z.array(UserResponseSchema),
  total: z.number().int(),
  page: z.number().int(),
  limit: z.number().int(),
});

