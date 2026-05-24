// src/users/user.entity.ts
import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';
import { Gender, UserStatus } from '../types/user.type';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ length: 100 })
  name!: string;

  @Column({ unique: true, length: 255 })
  email!: string;

  @Column({ unique: true, type: 'int' })
  loginId!: number;

  @Column({ select: false })
  password!: string;

  @Column({ select: false, type: 'int' })
  pin!: number;

  @Column({ type: 'text' })
  address!: string;

  @Column({ length: 100 })
  country!: string;

  @Column({ length: 100 })
  state!: string;

  @Column({ length: 100 })
  city!: string;

  @Column({ length: 20 })
  postalCode!: string;

  @Column({ length: 20 })
  phoneNumber!: string;

  @Column({ type: 'date' })
  dateOfBirth!: Date;

  @Column({ type: 'enum', enum: Gender })
  gender!: Gender;

  @Column({ type: 'enum', enum: UserStatus, default: UserStatus.ACTIVE })
  status!: UserStatus;

  @Column({ nullable: true })
  profilePictureUrl!: string;

  @Index()
  @Column({ type: 'timestamp', nullable: true })
  lastLoginAt!: Date | null;

  @DeleteDateColumn()
  deletedAt!: Date | null;

  @UpdateDateColumn()
  updatedAt!: Date;

  @CreateDateColumn()
  createdAt!: Date;
}
