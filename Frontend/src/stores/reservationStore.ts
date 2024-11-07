//reservationStore
import { defineStore } from "pinia";
import { ref } from "vue";
import type { Reservation } from "../interfaces/Reservation";
import { deleteReservationById, getReservasByApartment, getReservasByUser } from "../services/reservationService";
import { getApartmentByID } from "../services/apartmentService";
import type { Apartment } from "../interfaces/Apartment";


export const useReservationStore = defineStore('reservationStore', () =>{

    const reservations = ref<Reservation[]>([]);
    const loading = ref(false);
    const error = ref<string | null>(null);
    const apartmentReservations = ref<Reservation[]>([]);

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
        await fetchApartmentReservations(apartmentId);

        if (!isDateRangeAvailable(startDate, endDate)) {
            alert('La reserva no puede ser creada. Las fechas se solapan con otra reserva existente.');
            error.value ='La reserva no puede ser creada. Las fechas se solapan con otra reserva existente.';
            console.error(error.value)
            return;
        } else if(!validateDates(startDate, endDate)){
            return;
        }
        const totalAmount = await calculateTotalAmount(apartmentId, startDate, endDate);

        const newReservation: Omit<Reservation, 'id'> = {
            apartmentId: apartmentId,
            userId: userId,
            startDate: startDate,
            endDate: endDate,
            totalAmount: totalAmount
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

    const calculateTotalAmount = async(apartmentId:string, startDate: string, endDate: string) : Promise<number> =>{
        const apartment:Apartment = await getApartmentByID(apartmentId);
        const start = new Date(startDate);
        const end = new Date(endDate);

        const timeDifference = end.getTime() - start.getTime();
        const dayDifference = timeDifference / (1000 * 3600 * 24);
        
        return apartment.price * dayDifference;

    }

    const deleteReservation = async(reservationId:string) => {
        try{
            const response = await deleteReservationById(reservationId);

            if (response) {
                reservations.value = reservations.value.filter(reservation => reservation.id !== reservationId);
                alert('Reserva eliminada exitosamente');
            } else {
                alert('No se pudo eliminar la reserva');
            }
        } catch (err) {
          console.error('Error al eliminar la reserva:', err);
          alert('Hubo un error al intentar eliminar la reserva');
        }
    }

    const fetchApartmentReservations = async (apartmentId: string) => {
        apartmentReservations.value = [];
        loading.value = true;

        try {
            apartmentReservations.value = await getReservasByApartment(apartmentId);
        } catch (err) {
            error.value = 'Error al cargar reservas del apartamento';
            console.error(error);
        } finally {
            loading.value = false;
        }
    };

    const isDateRangeAvailable = (startDate: string, endDate: string): boolean => {
        const start = new Date(startDate).getTime();
        const end = new Date(endDate).getTime();

        // Verifica si hay solapamiento de fechas en apartmentReservations
        return !apartmentReservations.value.some(reservation => 
            (new Date(reservation.startDate).getTime() <= end && new Date(reservation.endDate).getTime() >= start)
        );
    };

    const validateDates = (startDate: string, endDate: string): boolean =>{

        const currentDate = new Date();

        if (new Date(startDate) < currentDate || new Date(endDate) < currentDate) {
            error.value = 'Las fechas de reserva no pueden estar en el pasado.';
            alert('Las fechas de reserva no pueden estar en el pasado.')
            console.error(error.value)
            return false;
        } else if (new Date(endDate) <= new Date(startDate)) {
            error.value = 'La fecha de fin debe ser posterior a la fecha de inicio.';
            alert('La fecha de fin debe ser posterior a la fecha de inicio')
            console.error(error.value)
            return false;
        }
        return true;
    }

    return {
        reservations,
        loading,
        error,
        fetchUserReservation,
        createNewReservation,
        deleteReservation
    }
})