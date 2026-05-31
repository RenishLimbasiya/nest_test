import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import type { CreateUserDto } from './dtos/create.user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  save(@Body() user: CreateUserDto) {
    return this.userService.saveUser(user);
  }

  @Patch('/:id')
  update(@Param('id') id: string, @Body() user: Partial<CreateUserDto>) {
    return this.userService.updateUser(id, user);
  }

  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }

  @Get('/:id')
  findById(@Param('id') id: string) {
    return this.userService.findUserById(id);
  }

  @Get()
  findAll() {
    return this.userService.findAllUsers();
  }
}
