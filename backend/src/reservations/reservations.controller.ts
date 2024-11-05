// src/reservations/reservations.controller.ts
import { Controller, Post, Get, Body, Param, HttpCode } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  // Crear una nueva reserva
  @Post()
  @HttpCode(201)
  createReservation(@Body() createReservationDto: CreateReservationDto) {
    return this.reservationsService.createReservation(createReservationDto);
  }

  // Obtener una reserva específica por ID
  @Get(':id')
  getReservation(@Param('id') id: string) {
    return this.reservationsService.getReservation(id);
  }

  // Obtener todas las reservas de un usuario
  @Get('user/:userId')
  getUserReservations(@Param('userId') userId: string) {
    return this.reservationsService.getUserReservations(userId);
  }
}
