<!-- src/components/Header.vue -->
<template>
  <header class="app-header">
    <h1>Parada Perfecta</h1>
    <nav>
      <router-link to="/">Apartamentos</router-link>
      <router-link v-if="!userStore.user" to="/login">Login</router-link>
      <router-link v-if="!userStore.user" to="/register">Registro</router-link>
      <button v-if="userStore.user" @click="userStore.logout">Logout</button>
      <router-link v-if="userStore.user" to="/profile">Profile</router-link>
    </nav>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useUserStore } from '../stores/userStore'

export default defineComponent({
  name: 'Header',
  setup() {
    const userStore = useUserStore()
    return { userStore }
  },
})
</script>

<style scoped>
/* Estilos para el encabezado */
.app-header {
  position: fixed; /* Fija el encabezado en la parte superior */
  top: 0; /* Posición superior */
  left: 0; /* Posición izquierda */
  width: 100%; /* Ocupa todo el ancho de la ventana */
  display: flex;
  justify-content: space-between; /* Espacio entre elementos */
  align-items: center; /* Centra verticalmente */
  padding: 15px 20px; /* Espaciado interno */
  background-color: #2980b9; /* Color de fondo azul */
  color: white; /* Color del texto */
  z-index: 1000; /* Asegura que el encabezado esté encima de otros elementos */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Sombra sutil para un efecto de profundidad */
}

.app-header h1 {
  font-size: 1.8em; /* Tamaño más grande para el título */
  margin: 0; /* Eliminar margen para un mejor alineamiento */
}

nav {
  display: flex; /* Diseño flexible para el menú */
  gap: 1.5rem; /* Espacio entre enlaces */
}

nav a {
  color: white; /* Color blanco para los enlaces */
  text-decoration: none; /* Sin subrayado */
  font-weight: bold; /* Negrita para mayor énfasis */
  transition: color 0.3s; /* Transición suave del color */
}

nav a:hover {
  color: #f39c12; /* Color amarillo para el hover */
}

button {
  background: none; /* Sin fondo */
  border: none; /* Sin borde */
  color: white; /* Texto blanco */
  cursor: pointer; /* Manito al pasar el cursor */
  font-weight: bold; /* Negrita para mayor énfasis */
  transition: color 0.3s; /* Transición suave del color */
}

button:hover {
  color: #f39c12; /* Color amarillo para el hover */
}
</style>
