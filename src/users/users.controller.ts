import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserService } from './users.service';
import { UserDto } from './dtos/user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { AuthService } from './auth.service';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor(
    private usersService: UserService,
    private authService: AuthService,
  ) {}

  @Post('signup')
  async createUser(@Body() body: CreateUserDto) {
    return await this.authService.signup(body.email, body.password);
  }

  @Get('/:id')
  async findUser(@Param('id') id: number) {
    const user = await this.usersService.findOne(id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  @Get()
  findAllUsers(@Query('email') email: string) {
    return this.usersService.find(email);
  }

  @Patch('/:id')
  updateUser(@Query('id') id: number, @Body() body: UpdateUserDto) {
    return this.usersService.update(id, body);
  }

  @Delete('/:id')
  removeUser(@Query('id') id: number) {
    return this.usersService.remove(id);
  }
}
