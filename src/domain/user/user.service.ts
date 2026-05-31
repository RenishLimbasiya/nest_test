import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dtos/create.user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  saveUser(user: CreateUserDto) {
    return this.userRepository.createUser(user);
  }

  updateUser(id: string, user: Partial<CreateUserDto>) {
    return this.userRepository.updateUser(id, user);
  }

  deleteUser(id: string) {
    return this.userRepository.deleteUser(id);
  }

  findUserById(id: string) {
    return this.userRepository.findUserById(id);
  }

  findAllUsers() {
    return this.userRepository.findAllUsers();
  }

  findUsersByEmail(email: string) {
    return this.userRepository.findUsersByEmail(email);
  }
}
