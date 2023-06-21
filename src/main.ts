import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .setTitle('Paw Project')
  .setDescription('Swagger API in JSON, <a href="/api-json">http://localhost:3000/api-json</a>.')
  .setVersion('1.0')
  .addServer('/api')
  .addBearerAuth()
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  app.useGlobalPipes(new ValidationPipe())
  app.setGlobalPrefix('api');

  await app.listen(process.env.API_PORT);
}
bootstrap();
