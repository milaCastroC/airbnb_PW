<!-- src/views/Profile.vue -->
<template>
    <div>
      <h1>Your Reservations</h1>
      <div v-if="reservations.length">
        <div v-for="reservation in reservations" :key="reservation.id" class="reservation">
          <h3>{{ reservation.apartment.name }}</h3>
          <p>Check-in: {{ reservation.checkIn }}</p>
          <p>Check-out: {{ reservation.checkOut }}</p>
        </div>
      </div>
      <p v-else>You have no reservations yet.</p>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
import { useUserStore } from '../stores/userStore';
  
  export default defineComponent({
    name: 'Profile',
    setup() {
      const reservations = ref([]);
      const userStore = useUserStore();
  
      onMounted(async () => {
        const userId = userStore.user?.id;
        if (userId) {
          const response = await fetch(`https://mockapi.io/users/${userId}/reservations`);
          reservations.value = await response.json();
        }
      });
  
      return { reservations };
    },
  });
  </script>
  
  <style scoped>
  .reservation {
    border: 1px solid #ddd;
    padding: 1rem;
    margin: 0.5rem 0;
  }
  </style>
  