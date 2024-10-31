import { defineStore } from 'pinia';
import { ref, type Ref } from 'vue';
import { useRouter } from 'vue-router';
import type { User } from '../interfaces/User';
import { getUserByEmail } from '../services/userService';

export const useUserStore = defineStore('user', () => {
    const user: Ref<User | null> = ref(null);

  // Recupera el usuario almacenado en la sesión (si existe) y lo asigna a `user`
  const storedUser = sessionStorage.getItem('user');
  if (storedUser) {
    user.value = JSON.parse(storedUser);
  }

  const router = useRouter();

  async function login(email: string, password: string) {
    const response = await getUserByEmail(email, password);
    if (response) {
      user.value = response;
      sessionStorage.setItem('user', JSON.stringify(response));
      router.push({ name: 'Profile' });
    } else {
      alert('Login failed: Invalid email or password');
    }
  }

  async function register(name: string, email: string, password: string) {
    const newUser:User = {
        id: "1",
        name: name,
        email: email,
        password: password,
    }
    const response = await fetch('https://67237d95493fac3cf24b11e5.mockapi.io/User', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser),
    });
    if (response.ok) {
      alert('Registration successful! Please log in.');
      router.push({ name: 'Login' });
    } else {
      alert('Registration failed');
    }
  }

  function logout() {
    user.value = null;
    sessionStorage.removeItem('user');
    router.push({ name: 'Home' });
  }

  return { user, login, register, logout };
});
