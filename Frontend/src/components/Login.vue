<template>
  <div class="form-container">
    <h1>Iniciar Sesión</h1>
    <form @submit.prevent="loginUser">
      <label for="email">Email:</label>
      <input type="email" v-model="email" required />

      <label for="password">Contraseña:</label>
      <input type="password" v-model="password" required />

      <button type="submit">Iniciar Sesión</button>
      <p>
        ¿No tienes una cuenta?
        <router-link to="/register">Regístrate aquí</router-link>
      </p>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useUserStore } from '../stores/userStore'

export default defineComponent({
  name: 'Login',
  setup() {
    const email = ref('')
    const password = ref('')
    const userStore = useUserStore()

    function loginUser() {
      userStore.login(email.value, password.value)
    }

    return { email, password, loginUser }
  },
})
</script>

<style scoped>
.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  padding: 40px; 
  border-radius: 12px; 
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1); 
  width: 100%;
  max-width: 400px;
  margin: 40px auto; 
}

h1 {
  color: #2c3e50; 
  font-size: 2.2em;
  margin-bottom: 30px;
  font-weight: 600;
  text-align: center;
}

form {
  width: 100%;
}

label {
  display: block;
  margin-bottom: 8px;
  color: #2c3e50;
  font-weight: 600;
  font-size: 0.95em;
  letter-spacing: 0.3px;
}

input[type='email'],
input[type='password'] {
  width: 100%;
  padding: 12px 16px; 
  margin-bottom: 24px;
  border: 2px solid #e1e8ef; 
  border-radius: 8px;
  font-size: 1em;
  color: #2c3e50;
  transition: all 0.3s ease;
  background-color: #f8fafc; 
}

input[type='email']:focus,
input[type='password']:focus {
  border-color: #3498db;
  outline: none;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1); 
  background-color: #ffffff;
}

input[type='email']::placeholder,
input[type='password']::placeholder {
  color: #94a3b8;
}

button[type='submit'] {
  width: 100%;
  padding: 14px; 
  background-color: #3498db;
  border: none;
  border-radius: 8px;
  color: #ffffff;
  font-size: 1.1em;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 10px;
  letter-spacing: 0.5px;
}

button[type='submit']:hover {
  background-color: #2980b9;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(41, 128, 185, 0.2);
}

button[type='submit']:active {
  transform: translateY(0px);
}

p {
  margin-top: 24px;
  color: #64748b;
  text-align: center;
  font-size: 0.95em;
}

router-link {
  color: #3498db;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
}

router-link:hover {
  color: #2980b9;
  text-decoration: underline;
}

@media (max-width: 768px) {
  .form-container {
    margin: 20px auto;
    padding: 24px;
  }

  h1 {
    font-size: 1.8em;
    margin-bottom: 24px;
  }

  input[type='email'],
  input[type='password'] {
    padding: 10px 14px;
  }

  button[type='submit'] {
    padding: 12px;
  }
}

@media (max-width: 480px) {
  .form-container {
    margin: 10px;
    padding: 20px;
  }

  h1 {
    font-size: 1.6em;
  }
}
</style>
