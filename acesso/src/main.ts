import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice({
    transport: Transport.GRPC,
    options: {
      url: '0.0.0.0:50051',
      package: 'acesso',
      protoPath: join(process.cwd(), './src/modulos/auth/auth.proto'),
    },
  });
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: true,
  });

  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
