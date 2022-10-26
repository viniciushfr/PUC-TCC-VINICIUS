import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configs = {
    transport: Transport.GRPC,
    options: {
      package: 'acesso',
      protoPath: join(__dirname, './auth/auth.proto'),
    },
  };

  app.connectMicroservice(configs);
  app.useGlobalPipes(new ValidationPipe());
  // app.useGlobalFilters(new CustomExceptionFilter());
  app.enableCors({
    origin: true,
  });

  await app.listen(3000);
}
bootstrap();
