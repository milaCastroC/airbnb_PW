<!-- src/App.vue -->
<template>
  <div id="app">
    <Header />
    <!-- El encabezado fijo -->
    <main class="content">
      <!-- Contenido principal -->
      <router-view />
      <!-- Aquí se mostrará el contenido según la ruta actual -->
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Header from './components/Header.vue' // Importa el componente Header

export default defineComponent({
  name: 'App',
  components: {
    Header, // Declara el componente Header para usarlo en el template
  },
})
</script>

<style>
#app {
  font-family: Arial, sans-serif;
  color: #2c3e50;
}

/* Asegura que el contenido no quede oculto detrás del encabezado */
.content {
  margin-top: 70px; /* Ajusta este valor según la altura de tu encabezado */
}
</style>
