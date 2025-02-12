import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'user',
        brokers: [
          `${process.env.NODE_ENV === 'dev' ? 'localhost' : 'kafka'}:9092`,
        ],
      },
      consumer: {
        groupId: 'user-consumer',
      },
    },
  });

  await app.startAllMicroservices();
  await app.listen(3001);
}
bootstrap();
