import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

process.env.TZ = 'America/Sao_Paulo'; // UTC -03:00


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
