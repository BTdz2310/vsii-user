import { Module } from '@nestjs/common';
import { RegisterModule } from './register/register.module';
import { KafkaModule } from './kafka/kafka.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    RegisterModule,
    KafkaModule,
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
