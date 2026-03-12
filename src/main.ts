import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { VersioningType, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /** Enable URI versioning as per rule (Standard v1 prefix) */
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  /** Apply global exception filters and validation pipes */
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  /** Configure Swagger documentation at /doc */
  /* eslint-disable i18next/no-literal-string */
  const config = new DocumentBuilder()
    .setTitle('Professional Boilerplate API')
    .setDescription('High-performance backend API following SOLID principles')
    .setVersion('1.0')
    .addTag('infrastructure')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);
  /* eslint-enable i18next/no-literal-string */

  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
