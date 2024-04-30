import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CityModule } from './city/city.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: '.env',
    isGlobal: true
  }), CityModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
