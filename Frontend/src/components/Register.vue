<template>
  <div class="form-container">
    <h1>Registro</h1>
    <form @submit.prevent="handleRegister">
      <label for="name">Nombre</label>
      <input v-model="name" class="name" required />

      <label for="email">Email:</label>
      <input type="email" v-model="email" required />

      <label for="password">Contraseña</label>
      <input type="password" v-model="password" required />

      <button type="submit">Registrarse</button>
      <p>
        ¿Ya tienes una cuenta?
        <router-link to="/login">Inicia sesión</router-link>
      </p>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useUserStore } from '../stores/userStore'

export default defineComponent({
  name: 'Register',
  setup() {
    const name = ref('')
    const email = ref('')
    const password = ref('')
    const userStore = useUserStore()

    const handleRegister = async () => {
      await userStore.register(name.value, email.value, password.value)
    }

    return { name, email, password, handleRegister }
  },
})
</script>

<style scoped>
.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff; /* Fondo blanco */
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 400px;
  margin: auto;
}

h1 {
  color: #333333; /* Color oscuro para el texto */
  font-size: 2em; /* Tamaño grande */
  margin-bottom: 20px; /* Espacio inferior */
}

label {
  display: block; /* Cada etiqueta en una línea */
  margin-bottom: 5px; /* Espacio inferior */
  color: #333333; /* Color oscuro para mejor visibilidad */
  font-weight: bold; /* Texto en negrita */
}

input[type='text'],
input[type='email'],
input[type='password'],
.name {
  width: 100%; /* Ancho completo */
  padding: 10px; /* Espaciado interno */
  margin-bottom: 20px; /* Separación entre campos */
  border: 1px solid #cccccc; /* Borde gris claro */
  border-radius: 4px; /* Bordes redondeados */
  font-size: 1em; /* Tamaño estándar */
  color: #333333; /* Color del texto */
  transition: border-color 0.3s; /* Transición suave */
}

input[type='text']:focus,
input[type='email']:focus,
input[type='password']:focus {
  border-color: #3498db; /* Color del borde al hacer clic */
  outline: none; /* Sin borde extra al enfocarse */
}

button[type='submit'] {
  width: 100%; /* Ancho completo */
  padding: 10px; /* Espaciado interno */
  background-color: #3498db; /* Color azul */
  border: none; /* Sin borde */
  border-radius: 4px; /* Bordes redondeados */
  color: #ffffff; /* Texto blanco */
  font-size: 1em; /* Tamaño estándar */
  font-weight: bold; /* Negrita */
  cursor: pointer; /* Manito al pasar el cursor */
  transition: background-color 0.3s; /* Transición suave */
}

button[type='submit']:hover {
  background-color: #2980b9; /* Azul más oscuro en hover */
}

p {
  margin-top: 15px; /* Margen superior */
  color: #666666; /* Color gris para el texto */
}
</style>
