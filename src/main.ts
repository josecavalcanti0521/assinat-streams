import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from 'pino-nestjs';
import { UnprocessableEntityException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.useLogger(app.get(Logger));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: () => {
        return new UnprocessableEntityException('Invalid fields.');
      },
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap().catch((error) => console.error(error));
