import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.GRPC,
    options: {
      package: 'alerta',
      url: '0.0.0.0:50054',
      protoPath: join(process.cwd(), './src/modulos/alerta/alerta.proto'),
    },
  });
  await app.listen();
}
bootstrap();
