<!-- src/views/Profile.vue -->
<template>
  <div>
    <h1>Your Reservations</h1>
    <div v-if="reservations.length">
      <div
        v-for="reservation in reservations"
        :key="reservation.id"
        class="reservation"
      >
        <!-- <h3>{{ apartmentStore.getApartment(reservation.apartmentId)?. }}</h3> -->
        <p>Check-in: {{ reservation.startDate }}</p>
        <p>Check-out: {{ reservation.endDate }}</p>
      </div>
    </div>
    <p v-else>You have no reservations yet.</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed } from 'vue'
import { useUserStore } from '../stores/userStore'
import { useReservationStore } from '../stores/reservationStore';
import { useApartmentStore } from '../stores/apartmentStore';

export default defineComponent({
  name: 'Profile',
  setup() {
    //const reservations = ref([])
    const userStore = useUserStore();
    const reservationStore = useReservationStore();
    const apartmentStore = useApartmentStore();
    

    onMounted(async () => {
      const userId = userStore.user?.id
      if (userId) {
        // const response = await fetch(
        //   `https://mockapi.io/users/${userId}/reservations`,
        // )
        // reservations.value = await response.json()
        await reservationStore.fetchUserReservation(userId);

      }
    });


    return { 
      reservations: computed(() => reservationStore.reservations),
      apartmentStore
    }
  },
})
</script>

<style scoped>
.reservation {
  border: 1px solid #ddd;
  padding: 1rem;
  margin: 0.5rem 0;
}
</style>
