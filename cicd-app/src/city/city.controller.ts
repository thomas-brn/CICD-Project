import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { CityService } from './city.service';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { City } from '@prisma/client';

@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Post()
  create(@Body() body: CreateCityDto) {
    return this.cityService.create(body);
  }

  @Get()
  findAll() {
    return this.cityService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cityService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCityDto: UpdateCityDto) {
    const city: City | null = await this.cityService.findOne(+id);
    if (!city) {
      throw new HttpException('City not found', HttpStatus.NOT_FOUND);
    }
    return this.cityService.update(+id, updateCityDto);
  }
  
  @Delete(':id')
  async remove(@Param('id') id: string) {
  const city: City | null = await this.cityService.findOne(+id);
  if (!city) {
    throw new HttpException('City not found', HttpStatus.NOT_FOUND);
  }
    return this.cityService.remove(+id);
  }
}
