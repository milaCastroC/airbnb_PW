import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/HomeView.vue';
import Profile from '../views/profile.vue';
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  { path: '/profile', name: 'Profile', component: Profile, meta: { requiresAuth: true } }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Protege la ruta del perfil si el usuario no está autenticado
router.beforeEach((to, from, next) => {
  const isAuthenticated = sessionStorage.getItem('user');
  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'Login' });
  } else {
    next();
  }
});

export default router;

