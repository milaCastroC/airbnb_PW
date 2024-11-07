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
          <p><strong>Valor total: $</strong> {{ reservation.totalAmount }}</p>
        </div>
        <div class="cancel-reservation">
          <button class="cancel-button" @click="reservationStore.deleteReservation(reservation.id)">Eliminar Reserva</button>
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
  padding: 40px;
  background-color: #f8fafc;
  min-height: 100vh;
}

h1 {
  color: #2c3e50;
  font-size: 2.4em;
  font-weight: 600;
  text-align: center;
  margin-bottom: 40px;
  letter-spacing: 0.3px;
}

.reservations-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
  max-width: 1400px;
  margin: 0 auto;
}

.reservation-card {
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: all 0.3s ease;
  border: 1px solid #e1e8ef;
}

.reservation-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.15);
}

.apartment-title {
  font-size: 1.4rem;
  margin: 16px;
  color: #2c3e50;
  text-align: center;
  font-weight: 600;
}

.image-apartment {
  height: 220px;
  overflow: hidden;
  position: relative;
}

.image-apartment img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.reservation-card:hover .image-apartment img {
  transform: scale(1.05);
}

.reservation-details {
  padding: 20px;
  border-top: 1px solid #e1e8ef;
  font-size: 1rem;
  color: #64748b;
}

.reservation-details p {
  margin: 12px 0;
  line-height: 1.5;
}

.reservation-details strong {
  color: #2c3e50;
  font-weight: 600;
  margin-right: 8px;
}

.cancel-reservation {
  padding: 20px;
  border-top: 1px solid #e1e8ef;
  text-align: center;
}

.cancel-button {
  width: 100%;
  padding: 12px 24px;
  background-color: #e74c3c;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  letter-spacing: 0.3px;
}

.cancel-button:hover {
  background-color: #c0392b;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(231, 76, 60, 0.2);
}

.cancel-button:active {
  transform: translateY(0);
}

.no-reservations {
  text-align: center;
  font-size: 1.2rem;
  color: #64748b;
  padding: 40px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  margin: 40px auto;
}

@media (max-width: 768px) {
  .profile {
    padding: 20px;
  }

  h1 {
    font-size: 2em;
    margin-bottom: 30px;
  }

  .reservations-list {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 20px;
  }

  .apartment-title {
    font-size: 1.2rem;
  }

  .image-apartment {
    height: 180px;
  }
}

@media (max-width: 480px) {
  .profile {
    padding: 15px;
  }

  h1 {
    font-size: 1.8em;
    margin-bottom: 20px;
  }

  .reservations-list {
    grid-template-columns: 1fr;
  }

  .reservation-card {
    margin-bottom: 20px;
  }

  .image-apartment {
    height: 160px;
  }
}
</style>
