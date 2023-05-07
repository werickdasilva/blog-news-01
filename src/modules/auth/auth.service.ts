import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UserService } from '../user/user.service';
import { compareHash } from 'src/utils/hash.util';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async login(loginDto: LoginDto) {
    const user = await this.userService.findEmail(loginDto.email);

    const isMatch = await compareHash(user?.password || '', loginDto.password);

    if (!user || !isMatch) {
      throw new NotFoundException('Email or password invalid');
    }

    return new HttpException('Ok', HttpStatus.OK);
  }
}
