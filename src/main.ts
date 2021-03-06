import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  Logger.warn(process.env.NODE_ENV)

  if (process.env.CORS) {
    Logger.warn('Enabling cors, most likely .env.development')
  }
  configService.get("CORS") && app.enableCors();
  configService.get("CORS_ORIGIN") && app.enableCors({ origin: configService.get("CORS_ORIGIN") });
  const config = new DocumentBuilder()
    .setTitle('Min Todo API')
    .setDescription('The Min Todo API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
