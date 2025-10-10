import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { signInDto } from './dtos/signin.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async singup(@Body() createUserDto: CreateUserDto) {
    return await this.authService.singup(createUserDto);
  }

  @Post('/signin')
  @HttpCode(HttpStatus.OK)
  async signin(@Body() signInDto: signInDto) {
    return await this.authService.signin(signInDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/test')
  test() {
    return 'Hello, World!';
  }
}
