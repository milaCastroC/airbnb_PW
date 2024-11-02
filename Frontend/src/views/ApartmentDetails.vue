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
  max-width: 800px; /* Ancho máximo para el contenedor */
  margin: 100px auto; /* Centrar el contenedor y dejar espacio arriba */
  padding: 20px; /* Espaciado interno */
  background-color: #f9f9f9; /* Color de fondo claro */
  border-radius: 8px; /* Bordes redondeados */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Sombra para profundidad */
  justify-items: center;
}

.apartment-image {
  width: 100%; /* Ancho completo del contenedor */
  height: auto; /* Mantener la proporción de la imagen */
  border-radius: 8px; /* Bordes redondeados para la imagen */
  margin-bottom: 20px; /* Espacio debajo de la imagen */
}

h1 {
  font-size: 2rem; /* Tamaño de fuente grande para el título */
  margin: 15px 0; /* Espaciado superior e inferior */
}

p {
  font-size: 1.2rem; /* Tamaño de fuente moderado */
  color: #555; /* Color gris para el texto */
  margin: 10px 0; /* Espacio vertical entre párrafos */
}

.reserve-button {
  margin-top: 20px; /* Espacio superior para el botón */
  padding: 10px 15px; /* Espaciado interno del botón */
  background-color: #2980b9; /* Color de fondo del botón */
  color: #fff; /* Color del texto del botón */
  border: none; /* Sin borde */
  border-radius: 5px; /* Bordes redondeados para el botón */
  cursor: pointer; /* Cambia el cursor al pasar el mouse */
  transition: background-color 0.3s; /* Transición suave del color de fondo */
}

.reserve-button:hover {
  background-color: #1a6698; /* Color más oscuro al pasar el mouse */
}

.loading {
  text-align: center; /* Centrar el texto de carga */
  font-size: 1.5rem; /* Tamaño de fuente grande para el mensaje de carga */
  color: #888; /* Color gris para el texto de carga */
}
</style>
