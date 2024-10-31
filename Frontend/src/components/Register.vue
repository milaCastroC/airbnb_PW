<template>
    <form @submit.prevent="handleRegister">
      <h2>Register</h2>
      <label for = "name">Name</label>
      <input v-model="name" required />
      <label for="email">Email:</label>
      <input type = "email" v-model="email" required />
      <label for = "password">Password</label>
      <input v-model="password" type="password" required />
      <button type="submit">Register</button>
      <p>¿Ya tienes una cuenta? <router-link to="/login">Inicia sesión</router-link></p>
    </form>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { useUserStore } from '@/stores/userStore';
  
  export default defineComponent({
    setup() {
      const name = ref('');
      const email = ref('');
      const password = ref('');
      const userStore = useUserStore();
  
      const handleRegister = async () => {
        await userStore.register(name.value, email.value, password.value);
      };
  
      return { name, email, password, handleRegister };
    }
  });
  </script>
  
  <style scoped>

  </style>
  