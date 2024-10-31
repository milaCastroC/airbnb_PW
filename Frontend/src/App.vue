<template>
  <div>
    <nav>
      <router-link to="/">Apartamentos</router-link>
      <router-link v-if="!userStore.user" to="/login">Login</router-link>
      <router-link v-if="!userStore.user" to="/register">Register</router-link>
      <button v-if="userStore.user" @click="userStore.logout">Logout</button>
      <router-link v-if="userStore.user" to="/profile">Profile</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useUserStore } from './stores/userStore';

export default defineComponent({
  setup() {
    const userStore = useUserStore();
    return { userStore };
  }
});
</script>

<style scoped>
/* Estilos de navegación */
nav {
  display: flex;
  gap: 1rem;
}
</style>

