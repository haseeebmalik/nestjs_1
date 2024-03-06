import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // the whitelist will remove the fields that are not in the dto.
  // let suppose in signup request our dto expects two fields i.e email and pass, so if some extra field came it will automatically remove it.
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(3333);
}
bootstrap();
