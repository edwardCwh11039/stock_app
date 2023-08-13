import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

import { HttpExceptionFilter } from './filter/http-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());

  app.setGlobalPrefix('api');

  app.enableCors({
    origin: ['http://localhost:8080'],
    credentials: true,
  });

  const options = new DocumentBuilder()
    .setTitle('Fund Management')
    .setDescription('Fund Management Backend')
    .setVersion('1.0')
    .addServer('http://')
    .addTag('fm', 'fms public api')
    .build();
  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('swagger', app, document);

  await app.listen(3001);
}
bootstrap();
