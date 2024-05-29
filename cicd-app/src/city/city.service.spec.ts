import { Test, TestingModule } from '@nestjs/testing';
import { CityService } from './city.service';
import { PrismaClient } from '@prisma/client';

describe('CityService', () => {
  let cityService: CityService;
  let prisma: PrismaClient;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CityService, PrismaClient],
    }).compile();

    cityService = module.get<CityService>(CityService);
    prisma = module.get<PrismaClient>(PrismaClient);
  });

  it('service should be defined', () => {
    expect(cityService).toBeDefined();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  // it('should create a new user', async () => {
  //   const user = await service.createUser({
  //     email: 'test@example.com',
  //     name: 'Test User',
  //   });

  //   expect(user).toBeDefined();
  //   expect(user.email).toBe('test@example.com');
  // });

  // it('should retrieve a user by email', async () => {
  //   await service.createUser({
  //     email: 'test@example.com',
  //     name: 'Test User',
  //   });

  //   const user = await service.findUserByEmail('test@example.com');
  //   expect(user).toBeDefined();
  //   expect(user.email).toBe('test@example.com');
  // });
});
