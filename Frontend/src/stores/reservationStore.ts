import { defineStore } from "pinia";
import { ref } from "vue";
import type { Reservation } from "../interfaces/Reservation";
import { getReservasByUser } from "../services/reservationService";


export const useReservationStore = defineStore('reservationStore', () =>{

    const reservations = ref<Reservation[]>([]);
    const loading = ref(false);
    const error = ref<string | null>(null);

    const fetchUserReservation = async(idUser: string) =>{
        reservations.value = [];
        loading.value = true;

        try{
            reservations.value = await getReservasByUser(idUser);
            console.log(reservations.value);
        } catch(err){
            error.value = 'Error al cargar reservas';
            console.error(error);
        }finally{
            loading.value = false;
        }
    }

    
    async function createNewReservation(apartmentId:string, userId:string, startDate:string, endDate:string) {
        const newReservation: Omit<Reservation, 'id'> = {
            apartmentId: apartmentId,
            userId: userId,
            startDate: startDate,
            endDate: endDate,
            totalAmount: 5
        }

        const response = await fetch('https://672b97d81600dda5a9f5a74e.mockapi.io/Reservation', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newReservation),
        });

        if (response.ok) {
            alert('Reserva creada Exitosamente. Entra a perfil para ver las reservas');
          } else {
            alert('No se pudo registrar la reserva');
          }
    }

    return {
        reservations,
        loading,
        error,
        fetchUserReservation,
        createNewReservation,
    }
})