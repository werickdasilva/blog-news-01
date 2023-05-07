import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/database/primsa.service';
import { EmailService } from 'src/utils/email/email.service';
import { hashPassword } from 'src/utils/hash.util';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly emailService: EmailService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const emailExist = await this.emailService.isEmailDoesNotExist(
      createUserDto.email,
    );

    if (emailExist) {
      throw new BadRequestException('Error email exist');
    }

    const password = await hashPassword(createUserDto.password);

    return this.prisma.user.create({ data: { ...createUserDto, password } });
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}