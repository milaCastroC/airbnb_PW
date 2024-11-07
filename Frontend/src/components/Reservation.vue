<!-- src/views/ReservationForm.vue -->
<template>
  <div class="reservation-form">
    <h2>Reservar Apartamento</h2>
    <form @submit.prevent="submitReservation">
      <div>
        <label for="startDate">Fecha de inicio:</label>
        <input type="date" v-model="startDate" required />
      </div>
      <div>
        <label for="endDate">Fecha de fin:</label>
        <input type="date" v-model="endDate" required />
      </div>
      <button type="submit" class="reserve-button">Confirmar Reserva</button>
    </form>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useUserStore } from '../stores/userStore';
import { useReservationStore } from '../stores/reservationStore';


export default defineComponent({
  name: 'ReservationForm',
  setup() {
    const startDate = ref('');
    const endDate = ref('');
    const error = ref('');
    const router = useRouter();
    const route = useRoute();
    const userStore = useUserStore();
    const reservationStore = useReservationStore();

    async function submitReservation() {
      if (!userStore.user) {
        error.value = 'Debes iniciar sesión para hacer una reserva.';
        router.push({ name: 'Login' });
        return;
      }

      try{
        await reservationStore.createNewReservation(
          route.params.id.toString(), 
          userStore.user.id, 
          startDate.value, 
          endDate.value
        );
        //ENVIAR AL INICIO O AL PERFIL
      }catch(err){
        error.value = reservationStore.error ||'Error al hacer la reserva. Por favor, inténtalo de nuevo.';
      }
      router.push({ name: 'Reservation' });
    }

    return {
      startDate,
      endDate,
      error,
      submitReservation,
    };
  },
});
</script>

<style scoped>
.reservation-form {
  max-width: 600px;
  margin: 100px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.reservation-form h2 {
  font-size: 1.8rem;
  margin-bottom: 20px;
}

form div {
  margin-bottom: 15px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

input[type="date"] {
  width: 100%;
  padding: 8px;
  font-size: 1rem;
}

.reserve-button {
  padding: 10px 15px;
  background-color: #2980b9;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.reserve-button:hover {
  background-color: #1a6698;
}

.error {
  color: red;
  margin-top: 10px;
}
</style>
