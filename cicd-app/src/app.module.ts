import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';

import { AppController } from './app.controller';
import { CityModule } from './city/city.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    CityModule,
    PrometheusModule.register(),
  ],

  controllers: [AppController],
  providers: [],
})
export class AppModule {}
