// src/api/reservations.ts
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3001', // Dirección del backend
  withCredentials: true,             // Para permitir cookies y encabezados de autenticación si se necesita
});

export async function createReservation(reservationData: any) {
  const response = await apiClient.post('/reservations', reservationData);
  return response.data;
}

export async function getUserReservations(userId: string) {
  const response = await apiClient.get(`/reservations/user/${userId}`);
  return response.data;
}
