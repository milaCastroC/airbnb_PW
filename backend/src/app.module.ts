// src/app.module.ts
import { Module } from '@nestjs/common';
import { ApartmentsModule } from './apartments/apartments.module';
import { ReservationsModule } from './reservations/reservations.module';

@Module({
  imports: [ApartmentsModule, ReservationsModule],
})
export class AppModule {}
