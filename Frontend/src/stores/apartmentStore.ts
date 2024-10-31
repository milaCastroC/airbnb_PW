//apartmentStore.ts

import { defineStore } from "pinia";
import { ref } from "vue";
import { getAllApartments } from "../services/apartmentService";
import type { Apartment } from "../interfaces/Apartment";

export const useApartmentStore = defineStore(
    'apartmentStore',() =>{
        const apartments = ref<Apartment[]>([]);
        const loading = ref(false);
        const error = ref<string | null>(null);  

        const fetchAllApartments = async () =>{
            loading.value = true;

            try{
                apartments.value = await getAllApartments();
            }catch (err) {
                error.value = 'Error al cargar apartamentos'
                console.error(error)
            }finally{
                loading.value = false;
            }
        }

        return {
            apartments,
            loading,
            error,
            fetchAllApartments
        }
    }

)