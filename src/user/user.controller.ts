import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { LoginDTO, RegisterDTO, UserDto } from './dto/user.dto';

@Controller('user')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post()
  createUser(@Body() user: UserDto) {
    return this.userService.createUser(user);
  }

  @Post('register')
  async registerUser(@Body() user: RegisterDTO) {
    return await this.userService.registerUser(user);
  }

  @Post('login')
  login(@Body() login: LoginDTO) {
    return this.userService.login(login);
  }

  @Get()
  getUserById() {
    return this.userService.getAll();
  }
  @Delete(':id')
  deleteUser(@Param('id') id: number) {
    return this.userService.deleteUser(id);
  }
}
