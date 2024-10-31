<!-- src/components/Login.vue -->
<template>
    <div>
      <h1>Login</h1>
      <form @submit.prevent="loginUser">
        <label for="email">Email:</label>
        <input type="email" v-model="email" required />
  
        <label for="password">Password:</label>
        <input type="password" v-model="password" required />
  
        <button type="submit">Login</button>
      </form>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
import { useUserStore } from '../stores/userStore';
  
  export default defineComponent({
    name: 'Login',
    setup() {
      const email = ref('');
      const password = ref('');
      const userStore = useUserStore();
  
      function loginUser() {
        userStore.login(email.value, password.value);
      }
  
      return { email, password, loginUser };
    },
  });
  </script>

  