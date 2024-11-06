import axios from "axios";
import type { Reservation } from "../interfaces/Reservation";

export async function getReservasByUser(idUser: string): Promise<Reservation[]> {
    const response = await axios.get<Reservation[]>(
        `https://672b97d81600dda5a9f5a74e.mockapi.io/Reservation?userId=${idUser}`
    )
    return response.data;
}

export async function getReservasByApartment(idApartment: string): Promise<Reservation[]> {
    const response = await axios.get<Reservation[]>(
        `https://6706e6d9a0e04071d2289d9a.mockapi.io/Reservation?apartmentId=${idApartment}`
    )
    return response.data;
}

