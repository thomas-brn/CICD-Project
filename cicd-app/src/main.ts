import { NestFactory } from '@nestjs/core';
import { exec } from 'child_process';

import { AppModule } from './app.module';

async function prismaMigration(): Promise<void> {
  return new Promise((resolve, reject) => {
      exec('npm run migrate:prod', (error, stdout) => {
          if (error) {
              console.log(error);
              reject(error);
          }
          console.log(stdout);
          resolve();
      });
  });
}

async function bootstrap() {
  const CITY_API_ADDR = process.env.CITY_API_ADDR || '37.37.192.0';
  const CITY_API_PORT = process.env.CITY_API_PORT || '2024';
  const CITY_API_DB_URL = process.env.CITY_API_DB_URL;
  const CITY_API_DB_USER = process.env.CITY_API_DB_USER;
  const CITY_API_DB_PWD = process.env.CITY_API_DB_PWD;

  if (!CITY_API_DB_URL || !CITY_API_DB_USER || !CITY_API_DB_PWD) {
    throw new Error(
      "Les variables d'environnement CITY_API_DB_URL, CITY_API_DB_USER, et CITY_API_DB_PWD doivent être définies",
    );
  }

  await prismaMigration();

  const app = await NestFactory.create(AppModule);
  await app.listen(CITY_API_PORT, CITY_API_ADDR);
  console.log(`Server is running on ${CITY_API_ADDR}:${CITY_API_PORT}`);
}
bootstrap();
