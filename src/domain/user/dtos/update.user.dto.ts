import { z } from 'zod';
import { GenderSchema, UserStatus, UserStatusSchema } from '../types/user.type';

export const UpdateUserSchema = z
  .object({
    name: z.string().min(1, 'Name is required').max(100),
    email: z.string().email('Invalid email').max(255),
    loginId: z.number().int().positive(),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    pin: z
      .number()
      .int()
      .min(1000, 'PIN must be 4 digits')
      .max(9999, 'PIN must be 4 digits'),
    address: z.string().min(1, 'Address is required'),
    country: z.string().min(1).max(100),
    state: z.string().min(1).max(100),
    city: z.string().min(1).max(100),
    postalCode: z.string().min(1).max(20),
    phoneNumber: z.string().min(7).max(20),
    dateOfBirth: z.coerce.date(),
    gender: GenderSchema,
    status: UserStatusSchema.default(UserStatus.ACTIVE),
    profilePictureUrl: z.url().nullable().optional(),
  })
  .partial();

export type UpdateUserDto = z.infer<typeof UpdateUserSchema>;
