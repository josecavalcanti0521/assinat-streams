import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AccessToken } from './interfaces/access-token';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { signInDto } from './dtos/signin.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.usersService.findOneByEmail(email);

    if (!user) throw new BadRequestException('User not found');

    const isMatch: boolean = await bcrypt.compare(password, user.password);

    if (!isMatch) throw new UnauthorizedException('Invalid credentials');

    return user;
  }

  async singup(createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  async signin(signInDto: signInDto): Promise<AccessToken> {
    const userWithoutPassword = await this.validateUser(
      signInDto.email,
      signInDto.password,
    );

    return this.login(userWithoutPassword);
  }

  login(user: User): AccessToken {
    const payload = { email: user.email, sub: user.id };
    return { access_token: this.jwtService.sign(payload) };
  }
}
