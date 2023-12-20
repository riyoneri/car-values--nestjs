import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('signup')
  createUser(@Body() body: CreateUserDto) {
    this.usersService.create(body.email, body.password);
    return 'Hellow world';
  }

  @Get('/:id')
  findUser(@Param('id') id: number) {
    return this.usersService.findOne(id);
  }
}
