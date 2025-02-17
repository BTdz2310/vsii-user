import { Inject, Injectable } from '@nestjs/common';
import {
  AuthPayloadRegisterDto,
  AuthPayloadGetUser,
} from './dto/create-register.dto';
import { ClientKafka } from '@nestjs/microservices';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

const avatars = [
  'https://cdn-icons-png.flaticon.com/128/7703/7703936.png',
  'https://cdn-icons-png.flaticon.com/128/4395/4395608.png',
  'https://cdn-icons-png.flaticon.com/128/2171/2171990.png',
  'https://cdn-icons-png.flaticon.com/128/6988/6988878.png',
  'https://cdn-icons-png.flaticon.com/128/2584/2584580.png',
  'https://cdn-icons-png.flaticon.com/128/15427/15427551.png',
  'https://cdn-icons-png.flaticon.com/128/11178/11178560.png',
  'https://cdn-icons-png.flaticon.com/128/2711/2711858.png',
  'https://cdn-icons-png.flaticon.com/128/3231/3231399.png',
  'https://cdn-icons-png.flaticon.com/128/7499/7499400.png',
  'https://cdn-icons-png.flaticon.com/128/2510/2510421.png',
  'https://cdn-icons-png.flaticon.com/128/3296/3296693.png',
];

@Injectable()
export class RegisterService {
  constructor(
    @Inject('USER_SERVICE') private readonly kafkaClient: ClientKafka,
    private prisma: PrismaService,
  ) {}

  async register(data: AuthPayloadRegisterDto) {
    try {
      // throw new Error();
      console.log(data);
      await this.prisma.user.create({
        data: {
          fullName: data.fullname,
          authId: data.authId,
          avatar: avatars[Math.floor(Math.random() * avatars.length)],
        },
      });
    } catch (e) {
      console.log(e)
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

  check2(message: any) {
    console.log(message)
    return `Hello ${message}`;
    // return `Hello ${message}`;
  }

  async getUser(data: AuthPayloadGetUser) {
    return this.prisma.user.findUnique({
      where: {
        authId: data.authId,
      },
    });
  }
}
