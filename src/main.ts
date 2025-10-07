import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from 'pino-nestjs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.useLogger(app.get(Logger));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap().catch((error) => console.error(error));
