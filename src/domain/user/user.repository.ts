import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dtos/create.user.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User) private readonly repository: Repository<User>,
  ) {}

  createUser(user: CreateUserDto) {
    const newUser = this.repository.create(user);
    return this.repository.save(newUser);
  }

  updateUser(id: string, user: Partial<CreateUserDto>) {
    return this.repository.update(id, user);
  }

  deleteUser(id: string) {
    return this.repository.softDelete(id);
  }

  findUserById(id: string) {
    return this.repository.findOne({ where: { id }, withDeleted: true });
  }

  findAllUsers() {
    return this.repository.find({ withDeleted: true });
  }

  findUsersByEmail(email: string) {
    return this.repository.find({ where: { email }, withDeleted: true });
  }
}
