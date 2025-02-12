import { Module } from '@nestjs/common';
import { RegisterService } from './register.service';
import { RegisterController } from './register.controller';
import { KafkaModule } from 'src/kafka/kafka.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [KafkaModule],
  controllers: [RegisterController],
  providers: [RegisterService, PrismaService],
})
export class RegisterModule {}
