import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/database/primsa.service';
import { EmailService } from 'src/utils/email/email.service';
import { hashPassword } from 'src/utils/hash.util';
import { FindUserDto } from './dto/find-user.dto';
import { ReturnUserDto } from './dto/return-user.dto';

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

    return this.prisma.user
      .create({ data: { ...createUserDto, password } })
      .then(() => {
        throw new HttpException('User created successfully.', HttpStatus.OK);
      });
  }

  async findOne(id: number): Promise<FindUserDto> {
    const find = await this.prisma.user.findUnique({ where: { id } });
    return new FindUserDto({ ...find });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async findEmail(email: string): Promise<ReturnUserDto | undefined> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }
}
