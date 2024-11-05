// src/reservations/dto/create-reservation.dto.ts
import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateReservationDto {
  @IsString()
  @IsNotEmpty()
  apartmentId: string;

  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;

  @IsNumber()
  @IsNotEmpty()
  totalAmount: number;
}
