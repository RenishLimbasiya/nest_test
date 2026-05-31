import { z } from 'zod';
import { GenderSchema, UserStatus, UserStatusSchema } from '../types/user.type';

export const CreateUserSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.email('Invalid email').max(255),
  loginId: z.number().int().positive(),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  pin: z
    .number()
    .int()
    .min(1000, 'PIN must be 4 digits')
    .max(9999, 'PIN must be 4 digits')
    .optional(),
  address: z.string().min(1, 'Address is required').optional(),
  country: z.string().min(1).max(100).optional(),
  state: z.string().min(1).max(100).optional(),
  city: z.string().min(1).max(100).optional(),
  postalCode: z.string().min(1).max(20).optional(),
  phoneNumber: z.string().min(7).max(20).optional(),
  dateOfBirth: z.coerce.date().optional(),
  gender: GenderSchema,
  status: UserStatusSchema.default(UserStatus.ACTIVE).optional(),
  profilePictureUrl: z.url().optional(),
});

export type CreateUserDto = z.infer<typeof CreateUserSchema>;
