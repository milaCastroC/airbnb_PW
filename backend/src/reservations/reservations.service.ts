import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ReservationsService {
  constructor(private readonly httpService: HttpService) {}

  async createReservation(createReservationDto: CreateReservationDto) {
    const { apartmentId, startDate, endDate } = createReservationDto;

    // Validación de disponibilidad del apartamento
    const apartmentAvailable = await this.isApartmentAvailable(apartmentId);
    if (!apartmentAvailable) {
      throw new BadRequestException('El apartamento no está disponible para reservar.');
    }

    // Validación de fechas en el pasado
    const currentDate = new Date();
    if (new Date(startDate) < currentDate || new Date(endDate) < currentDate) {
      throw new BadRequestException('Las fechas de reserva no pueden estar en el pasado.');
    }

    // Validación de que la fecha de fin sea posterior a la de inicio
    if (new Date(endDate) <= new Date(startDate)) {
      throw new BadRequestException('La fecha de fin debe ser posterior a la fecha de inicio.');
    }

    // Lógica para crear la reserva (mocked)
    const reservationResponse = await firstValueFrom(
      this.httpService.post(`https://6706e6d9a0e04071d2289d9a.mockapi.io/Reservation`, createReservationDto)
    );

    return reservationResponse.data;
  }

  // Método para verificar si el apartamento está disponible en MockAPI
  private async isApartmentAvailable(apartmentId: string): Promise<boolean> {
    const response = await firstValueFrom(
      this.httpService.get(`https://67237d95493fac3cf24b11e5.mockapi.io/Apartments/${apartmentId}`)
    );
    const apartment = response.data;
    
    // Se asume que el campo `isAvailable` en MockAPI indica la disponibilidad del apartamento
    return apartment.isAvailable;
  }

    // Método para obtener una reserva específica por ID
    async getReservation(id: string) {
        try {
          const response = await firstValueFrom(
            this.httpService.get(`https://6706e6d9a0e04071d2289d9a.mockapi.io/Reservation/${id}`)
          );
          return response.data;
        } catch (error) {
          throw new NotFoundException(`Reservation with ID ${id} not found`);
        }
      }
    
      // Método para obtener todas las reservas de un usuario específico
      async getUserReservations(userId: string) {
        const response = await firstValueFrom(
          this.httpService.get(`hhttps://6706e6d9a0e04071d2289d9a.mockapi.io/Reservation?userId=${userId}`)
        );
        return response.data;
      }

  
}


