import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/database/primsa.service';
import { EmailModule } from 'src/utils/email/email.module';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService],
  imports: [EmailModule],
  exports: [UserService],
})
export class UserModule {}
