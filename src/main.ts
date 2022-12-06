import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { writeFileSync } from 'fs';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      stopAtFirstError: true,
      skipMissingProperties: false,
    }),
  );
  app.useStaticAssets(join(__dirname, '..', 'public'));

  try {
    const config = new DocumentBuilder()
      .setTitle('Demo Credit API Docs')
      .setDescription('API documentation for Demo Credit application')
      .setVersion('1.0')
      .setBasePath(`${process.env.APP_URL}/api`)
      .build();

    const document = SwaggerModule.createDocument(app, config);
    writeFileSync('public/swagger-spec.json', JSON.stringify(document));

    SwaggerModule.setup('swagger', app, document);
  } catch (error) {
    console.error(error);
  }

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
