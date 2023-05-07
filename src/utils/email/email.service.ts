import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/primsa.service';

@Injectable()
export class EmailService {
  constructor(private readonly prisma: PrismaService) {}

  async isEmailDoesNotExist(email: string): Promise<boolean> {
    return !!(await this.prisma.user.findUnique({ where: { email } }));
  }
}
