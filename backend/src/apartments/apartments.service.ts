// src/apartments/apartments.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ApartmentsService {
  private readonly baseUrl = 'https://mockapi.io/apartments';

  async getApartmentById(id: string) {
    try {
      const response = await axios.get(`${this.baseUrl}/${id}`);
      return response.data;
    } catch (error) {
      throw new NotFoundException('Apartment not found');
    }
  }
}
