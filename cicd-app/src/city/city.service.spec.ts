import { Test, TestingModule } from '@nestjs/testing';
import { City, PrismaClient } from '@prisma/client';

import { CityService } from './city.service';

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

  beforeEach(async () => {
    await prisma.city.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('should create a new city', async () => {
    const user = await cityService.create({
      department_code: '34',
      insee_code: '028392',
      zip_code: '34000',
      name: 'Montpellier',
      lat: 327383,
      lon: 2983039,
    });

    expect(user).toBeDefined();
  });

  it('should retrieve a list of cities', async () => {
    await cityService.create({
      department_code: '34',
      insee_code: '028392',
      zip_code: '34000',
      name: 'Montpellier',
      lat: 327383,
      lon: 2983039,
    });

    const cities: City[] = await cityService.findAll();
    expect(cities).toBeDefined();
    expect(cities.length).toBe(1);
  });
});
