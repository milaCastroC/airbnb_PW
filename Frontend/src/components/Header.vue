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
.app-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2.5rem;
  background: linear-gradient(to right, #2980b9, #3498db);
  color: white;
  z-index: 1000;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(8px);
  transition: all 0.3s ease;
}

.app-header.scrolled {
  padding: 0.75rem 2.5rem;
  background: rgba(41, 128, 185, 0.95);
  backdrop-filter: blur(8px);
}

.app-header h1 {
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0;
  letter-spacing: -0.5px;
  background: linear-gradient(135deg, #ffffff 0%, #e3f2fd 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

nav {
  display: flex;
  align-items: center;
  gap: 2rem;
}

nav a, nav button {
  position: relative;
  color: white;
  text-decoration: none;
  font-weight: 500;
  font-size: 1rem;
  padding: 0.5rem 0;
  transition: all 0.3s ease;
  opacity: 0.9;
}

nav a::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 0;
  height: 2px;
  background-color: #f8f9fa;
  transition: width 0.3s ease;
  border-radius: 2px;
}

nav a:hover::after {
  width: 100%;
}

nav a:hover, nav button:hover {
  opacity: 1;
  transform: translateY(-1px);
}

nav a.router-link-active {
  color: #ffffff;
  opacity: 1;
}

nav a.router-link-active::after {
  width: 100%;
  background-color: #f8f9fa;
}

button {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  cursor: pointer;
  font-weight: 500;
  padding: 0.5rem 1.25rem;
  border-radius: 6px;
  transition: all 0.3s ease;
}

button:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.3);
  transform: translateY(-1px);
}

@media (max-width: 768px) {
  .app-header {
    padding: 1rem 1.5rem;
  }

  .app-header h1 {
    font-size: 1.5rem;
  }

  nav {
    gap: 1.25rem;
  }

  nav a, nav button {
    font-size: 0.9rem;
  }

  button {
    padding: 0.4rem 1rem;
  }
}

@media (max-width: 640px) {
  .app-header {
    padding: 0.75rem 1rem;
  }

  nav {
    gap: 1rem;
  }

  .app-header h1 {
    font-size: 1.25rem;
  }

  button {
    padding: 0.35rem 0.85rem;
  }
}
</style>
