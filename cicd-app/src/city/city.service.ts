import { Injectable } from '@nestjs/common';
import { City } from '@prisma/client';

import prisma from '../utils/prisma.service';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';

@Injectable()
export class CityService {
  create(createCityDto: CreateCityDto) {
    return prisma.city.create({
      data: createCityDto,
    });
  }

  async findAll(): Promise<City[]> {
    return await prisma.city.findMany();
  }

  async findOne(id: number): Promise<City | null> {
    return await prisma.city.findUnique({
      where: {
        id: id,
      },
    });
  }

  update(id: number, updateCityDto: UpdateCityDto): Promise<City> {
    return prisma.city.update({
      where: {
        id: id,
      },
      data: updateCityDto,
    });
  }

  remove(id: number) {
    return prisma.city.delete({
      where: {
        id: id,
      },
    });
  }
}
