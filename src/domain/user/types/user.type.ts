import z from 'zod';

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
  DELETED = 'deleted',
}

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

export const UserStatusSchema = z.enum(UserStatus);
export const UserRoleSchema = z.enum(UserRole);
export const GenderSchema = z.enum(Gender);
