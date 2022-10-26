import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  /*
  const configs = {
    transport: Transport.GRPC,
    options: {
      package: 'ativos',
      protoPath: join(__dirname, '../src/auth.proto'),
    },
  };

  app.connectMicroservice(configs);
  */
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
