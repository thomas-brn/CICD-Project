import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port: number = configService.get('PORT') || 3000;

  console.log("Listening on http://localhost:" + port + " ...");

  await app.listen(port);
}
bootstrap();
