import { Controller, Get, HttpCode } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  @Get()
  getHello(): any {
    return { message: 'The application is running !' };
  }

  @Get('_health')
  @HttpCode(204)
  healthCheck() {}
}
