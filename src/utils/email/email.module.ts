import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/primsa.service';
import { EmailService } from './email.service';

@Module({
  providers: [EmailService, PrismaService],
  exports: [EmailService],
})
export class EmailModule {}
