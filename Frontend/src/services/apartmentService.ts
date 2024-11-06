import axios from "axios";
import type { Apartment } from "../interfaces/Apartment";

export async function getApartmentByID(id: string): Promise <Apartment> {
    const response = await axios.get<Apartment[]>(
        `https://67237d95493fac3cf24b11e5.mockapi.io/Apartments?id=${id}`,
    )
    return response.data[0];
}

export async function getAllApartments(): Promise <Apartment[]> {
    const response = await axios.get<Apartment[]>(
        `https://67237d95493fac3cf24b11e5.mockapi.io/Apartments`,
    )
    return response.data;
}