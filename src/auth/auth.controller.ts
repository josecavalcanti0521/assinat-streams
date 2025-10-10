import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { signInDto } from './dtos/signin.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserResponseDto } from '../users/dtos/user-response.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Serialize(UserResponseDto)
  @Post('/signup')
  async singup(@Body() createUserDto: CreateUserDto) {
    return await this.authService.singup(createUserDto);
  }

  @Post('/signin')
  @HttpCode(HttpStatus.OK)
  async signin(@Body() signInDto: signInDto) {
    return await this.authService.signin(signInDto);
  }
}
