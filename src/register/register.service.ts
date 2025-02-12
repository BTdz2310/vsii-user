import { Inject, Injectable } from '@nestjs/common';
import {
  AuthPayloadRegisterDto,
  AuthPayloadGetUser,
} from './dto/create-register.dto';
import { ClientKafka } from '@nestjs/microservices';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RegisterService {
  constructor(
    @Inject('USER_SERVICE') private readonly kafkaClient: ClientKafka,
    private prisma: PrismaService,
  ) {}

  async register(data: AuthPayloadRegisterDto) {
    try {
      // throw new Error();
      await this.prisma.user.create({
        data: {
          fullName: data.fullName,
          phoneNumber: data.phoneNumber,
          authId: data.authId,
          username: data.username,
          email: data.email,
          role: 0,
        },
      });
    } catch {
      this.kafkaClient.emit('user.register-failed', {
        authId: data.authId,
      });
    }
  }

  check(message: any) {
    console.log(message)
    return `Hello ${message}`;
    // return `Hello ${message}`;
  }

  async getUser(data: AuthPayloadGetUser) {
    return this.prisma.user.findUnique({
      where: {
        authId: data.authId,
        username: data.username,
      },
    });
  }
}
