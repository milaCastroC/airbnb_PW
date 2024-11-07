<template>
  <div class="profile">
    <h1>Your Reservations</h1>
    <div v-if="reservations.length" class="reservations-list">
      <div
        v-for="reservation in reservations"
        :key="reservation.id"
        class="reservation-card"
      >
        <h3 class="apartment-title">{{ apartments[reservation.apartmentId]?.title || 'Loading...' }}</h3>
        <div class="image-apartment">
          <img :src="apartments[reservation.apartmentId]?.img" :alt="apartments[reservation.apartmentId]?.title" />
        </div>
        <div class="reservation-details">
          <p><strong>Ingreso:</strong> {{ reservation.startDate }}</p>
          <p><strong>Salida:</strong> {{ reservation.endDate }}</p>
          <p><strong>Valor total:</strong> {{ reservation.totalAmount }}</p>
        </div>
        <div class="cancel-reservation">
          <button class="cancel-button" @click="reservationStore.deleteReservation(reservation.id)">Cancelar Reserva</button>
        </div>
      </div>
    </div>
    <p v-else class="no-reservations">You have no reservations yet.</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed, ref } from 'vue'
import { useUserStore } from '../stores/userStore'
import { useReservationStore } from '../stores/reservationStore';
import { useApartmentStore } from '../stores/apartmentStore';
import type { Apartment } from '../interfaces/Apartment';

export default defineComponent({
  name: 'Profile',
  setup() {
    //const reservations = ref([])
    const userStore = useUserStore();
    const reservationStore = useReservationStore();
    const apartmentStore = useApartmentStore();
    const apartments = ref<{ [key: string]: Apartment | undefined }>({});
    

    onMounted(async () => {
      const userId = userStore.user?.id
      if (userId) {
        await reservationStore.fetchUserReservation(userId);
        for (const reservation of reservationStore.reservations) {
          const apartmentId = reservation.apartmentId;
          if (!apartments.value[apartmentId]) {
            apartments.value[apartmentId] = await apartmentStore.getApartment(apartmentId);
          }
        }
      }
    });


    return { 
      reservations: computed(() => reservationStore.reservations),
      apartments,
      reservationStore
    }
  },
})
</script>

<style scoped>

.profile {
  font-family: Arial, sans-serif;
  padding: 2rem;
  background-color: #181818;
  color: #333;
}

h1 {
  text-align: center;
  color: #007bff;
  font-size: 2rem;
  margin-bottom: 1.5rem;
}

.reservations-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.reservation-card {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s;
}

.reservation-card:hover {
  transform: translateY(-5px);
}

.apartment-title {
  font-size: 1.25rem;
  margin: 0.5rem;
  color: #333;
  text-align: center;
}

.image-apartment {
  height: 200px;
  overflow: hidden;
}

.image-apartment img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.reservation-details {
  padding: 1rem;
  border-top: 1px solid #ddd;
  font-size: 0.9rem;
  color: #555;
}

.cancel-reservation {
  text-align: center;
  padding: 1rem;
  border-top: 1px solid #ddd;
}

.cancel-button {
  background-color: #dc3545;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.cancel-button:hover {
  background-color: #c82333;
}

.no-reservations {
  text-align: center;
  font-size: 1.1rem;
  color: #777;
}

</style>
