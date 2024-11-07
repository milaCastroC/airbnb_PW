import axios, { isAxiosError, type AxiosResponse } from "axios";
import type { Reservation } from "../interfaces/Reservation";

export async function getReservasByUser(idUser: string): Promise<Reservation[]> {
    const response = await axios.get<Reservation[]>(
        `https://672b97d81600dda5a9f5a74e.mockapi.io/Reservation?userId=${idUser}`
    )
    return response.data;
}

export async function getReservasByApartment(idApartment: string): Promise<Reservation[]> {
    try{
        const response = await axios.get<Reservation[]>(
            `https://672b97d81600dda5a9f5a74e.mockapi.io/Reservation?apartmentId=${idApartment}`
    
        )
        console.log(response)
        return response.data;
    }catch (error) {
        if (isAxiosError(error)) {
            if (error.response?.status === 404) {
                return []; // Retorna un array vacío si no hay reservas
            }
            throw new Error(`Error del servidor: ${error.message}`);
        }
        throw error;
    }
    
}

export async function  deleteReservationById(idReservation:string): Promise<AxiosResponse> {
    const response = await axios.delete(
        `https://672b97d81600dda5a9f5a74e.mockapi.io/Reservation/${idReservation}`
    );
    return response;
}
