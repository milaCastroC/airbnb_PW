<!-- ApartmentDetails.vue -->
<template>
    <header />
    <div v-if="apartment" class="apartment-details">
      <img :src="apartment.img" alt="Apartment Image" class="apartment-image" />
      <h1>{{ apartment.title }}</h1>
      <p>Precio por noche: ${{ apartment.price }}</p>
      <p>{{ apartment.description }}</p>
      <button @click="reserveApartment" class="reserve-button">Reservar</button>
    </div>
    <div v-else class="loading">
      Cargando detalles del apartamento...
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, onMounted, ref } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import type { Apartment } from '../interfaces/Apartment';
  import Header from '../components/Header.vue'; // Importa el componente Header
  
  export default defineComponent({
    name: 'ApartmentDetails',
    components: { Header }, // Registra el componente Header
    setup() {
      const apartment = ref<Apartment | null>(null);
      const route = useRoute();
      const router = useRouter();
  
      // Función para obtener los detalles del apartamento
      async function fetchApartmentDetails() {
        try {
          const response = await fetch(`https://67237d95493fac3cf24b11e5.mockapi.io/Apartments/${route.params.id}`);
          apartment.value = await response.json();
        } catch (error) {
          console.error('Error al cargar detalles del apartamento:', error);
        }
      }
  
      function reserveApartment() {
        // Redirigir a la página de reserva con los datos del apartamento
        router.push({ name: 'Reservation', params: { id: route.params.id } });
      }
  
      onMounted(fetchApartmentDetails);
  
      return { apartment, reserveApartment };
    },
  });
  </script>

<style scoped>
.apartment-details {
  max-width: 1000px;
  margin: 80px auto;
  padding: 30px;
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease;
  position: relative;
}

.apartment-details:hover {
  transform: translateY(-5px);
}

.apartment-image {
  width: 100%;
  height: 500px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.apartment-image:hover {
  transform: scale(1.02);
}

h1 {
  font-size: 2.5rem;
  font-weight: 700;
  color: #2c3e50;
  margin: 20px 0;
  line-height: 1.2;
  letter-spacing: -0.5px;
}

p {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #596677;
  margin: 16px 0;
}

p:has(+ .reserve-button) {
  margin-bottom: 30px;
}

.reserve-button {
  display: inline-block;
  padding: 15px 40px;
  font-size: 1.1rem;
  font-weight: 600;
  background: linear-gradient(135deg, #2980b9 0%, #3498db 100%);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: 0 4px 15px rgba(41, 128, 185, 0.3);
}

.reserve-button:hover {
  background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(41, 128, 185, 0.4);
}

.reserve-button:active {
  transform: translateY(1px);
  box-shadow: 0 2px 10px rgba(41, 128, 185, 0.3);
}

.loading {
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  color: #64748b;
  font-weight: 500;
}

@media (max-width: 768px) {
  .apartment-details {
    margin: 40px 20px;
    padding: 20px;
  }

  .apartment-image {
    height: 300px;
  }

  h1 {
    font-size: 2rem;
  }

  .reserve-button {
    width: 100%;
    padding: 12px 20px;
  }
}
</style>
