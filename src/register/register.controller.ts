import { Controller, Inject } from '@nestjs/common';
import { RegisterService } from './register.service';
import {
  MessagePattern,
  Payload,
  EventPattern,
  ClientKafka,
} from '@nestjs/microservices';
import {
  AuthPayloadGetUser,
  AuthPayloadRegisterDto,
} from './dto/create-register.dto';

@Controller('register')
export class RegisterController {
  constructor(
    @Inject('USER_SERVICE') private readonly kafkaClient: ClientKafka,
    private readonly registerService: RegisterService,
  ) {}

  onModuleInit() {
    this.kafkaClient.connect();
  }

  @EventPattern('auth.register')
  register(@Payload() data: AuthPayloadRegisterDto) {
    console.log('wtf', data);
    return this.registerService.register(data);
  }

  @MessagePattern('auth.check')
  check(@Payload() message: string) {
    const checkMsg = this.registerService.check(message);
    return checkMsg;
  }

  @MessagePattern('auth.check2')
  check2(@Payload() message: string) {
    const checkMsg = this.registerService.check2(message);
    return checkMsg;
  }

  @MessagePattern('auth.getUser')
  async getUser(@Payload() data: AuthPayloadGetUser) {
    console.log('data', data);
    const user = await this.registerService.getUser(data);
    console.log('user', user);
    return user;
  }
}
