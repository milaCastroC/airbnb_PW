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
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
  margin: 40px auto;
}

h2 {
  color: #2c3e50;
  font-size: 2.2em;
  margin-bottom: 30px;
  font-weight: 600;
  text-align: center;
}

form {
  width: 100%;
}

form div {
  margin-bottom: 24px;
}

label {
  display: block;
  margin-bottom: 8px;
  color: #2c3e50;
  font-weight: 600;
  font-size: 0.95em;
  letter-spacing: 0.3px;
}

input[type="date"] {
  width: 100%;
  padding: 12px 16px;
  margin-bottom: 8px;
  border: 2px solid #e1e8ef;
  border-radius: 8px;
  font-size: 1em;
  color: #2c3e50;
  transition: all 0.3s ease;
  background-color: #f8fafc;
}

input[type="date"]:focus {
  border-color: #3498db;
  outline: none;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
  background-color: #ffffff;
}

.reserve-button {
  width: 100%;
  padding: 14px;
  background-color: #3498db;
  border: none;
  border-radius: 8px;
  color: #ffffff;
  font-size: 1.1em;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 10px;
  letter-spacing: 0.5px;
}

.reserve-button:hover {
  background-color: #2980b9;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(41, 128, 185, 0.2);
}

.reserve-button:active {
  transform: translateY(0px);
}

.error {
  color: #e74c3c;
  text-align: center;
  margin-top: 16px;
  font-size: 0.95em;
  font-weight: 500;
}

@media (max-width: 768px) {
  .reservation-form {
    margin: 20px auto;
    padding: 24px;
  }

  h2 {
    font-size: 1.8em;
    margin-bottom: 24px;
  }

  input[type="date"] {
    padding: 10px 14px;
  }

  .reserve-button {
    padding: 12px;
  }
}

@media (max-width: 480px) {
  .reservation-form {
    margin: 10px;
    padding: 20px;
  }

  h2 {
    font-size: 1.6em;
  }
}
</style>
