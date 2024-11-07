/*Frontend/src/stores/userStore*/
import { defineStore } from 'pinia';
import { ref, type Ref } from 'vue';
import { useRouter } from 'vue-router';
import type { User } from '../interfaces/User';
import { getUserByEmail } from '../services/userService';

export const useUserStore = defineStore('user', () => {
    const user: Ref<User | null> = ref(null);
    const error = ref('');

  // Recupera el usuario almacenado en la sesión (si existe) y lo asigna a `user`
  const storedUser = sessionStorage.getItem('user');
  if (storedUser) {
    user.value = JSON.parse(storedUser);
  }

  const router = useRouter();

  async function login(email: string, password: string) {
    
    try{
      const response = await getUserByEmail(email);

      if (response && validatePassword(response.password, password)) {
        user.value = response;
        sessionStorage.setItem('user', JSON.stringify(response));
        router.push({ name: 'Profile' });
        console.log(response);
  
      } else {
        alert('Correo o contraseña incorrectos');
      }
    }catch(err){
      alert('Correo o contraseña incorrectos');
      error.value = 'Correo o contraseña incorrectos'
    }
  }

  const validatePassword = (userPassword:string, password:string) => userPassword == password;

  async function register(name: string, email: string, password: string) {
    const newUser: Omit<User, 'id'> = {
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
    router.push({ name: 'Apartments' });
  }

  return { user, login, register, logout };
});
