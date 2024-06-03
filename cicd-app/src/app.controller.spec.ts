import { Test, TestingModule } from '@nestjs/testing';

import { AppController } from './app.controller';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';

describe('AppController', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be health check', () => {
    return request(app.getHttpServer())
      .get('/_health')
      .expect(204);
  });
});
