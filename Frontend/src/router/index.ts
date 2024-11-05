// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router';
import Profile from '../views/profile.vue';
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';
import ApartmentsView from '../views/ApartmentsView.vue';
import ApartmentDetails from '../views/ApartmentDetails.vue';
import Reservation from '../components/Reservation.vue';

const routes = [
  {path: '/', name: 'Apartments', component: ApartmentsView},
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  { path: '/profile', name: 'Profile', component: Profile, meta: { requiresAuth: true } },
  { path: '/apartment/:id', name: 'ApartmentDetails', component: ApartmentDetails, props: true },
  { path: '/reserve/:id', name: 'Reservation', component: Reservation, props: true },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
