<!-- AparmentCard.vue -->
<template>
  <div class="apartment-container" @click="goToDetails">
    <h3 class="title">{{ apartment.title }}</h3>
    <img :src="apartment.img" :alt="apartment.title" />
    <p>{{ apartment.description }}</p>
    <p>Precio por noche: ${{ apartment.price }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import { useRouter } from 'vue-router'
import type { Apartment } from '../interfaces/Apartment'

export default defineComponent({
  name: 'ApartmentCard',
  props: {
    apartment: {
      type: Object as PropType<Apartment>,
      required: true,
    },
  },
  setup(props) {
    const router = useRouter()

    const goToDetails = () => {
      console.log(`Clicked on apartment with ID: ${props.apartment.id}`)
      router.push({ name: 'ApartmentDetails', params: { id: props.apartment.id } })
    }

    return { goToDetails }
  },
})
</script>


<style scoped>
.apartment-container {
  position: relative;
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin: 26px; 
}

.apartment-container:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
}

.title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #2c3e50;
  margin: 16px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.4;
  height: 2.8em;
}

img {
  width: 100%;
  height: 220px;
  object-fit: cover;
  transition: transform 0.3s ease;
  padding: 8px; 
}

.apartment-container:hover img {
  transform: scale(1.05);
}

p {
  padding: 0 16px;
  margin: 12px 0;
  color: #64748b;
  font-size: 0.95rem;
  line-height: 1.5;
}

p:first-of-type {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 4.5em;
}

p:last-of-type {
  margin-top: auto; 
  padding: 16px;
  font-weight: 600;
  color: #2980b9;
  font-size: 1.1rem;
  background: linear-gradient(to bottom, transparent, rgba(241, 245, 249, 0.5));
  border-top: 1px solid #f1f5f9;
}

.apartment-container::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to bottom,
    transparent 70%,
    rgba(0, 0, 0, 0.02)
  );
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.apartment-container:hover::after {
  opacity: 1;
}

@media (max-width: 768px) {
  .title {
    font-size: 1.2rem;
  }

  img {
    height: 200px;
  }

  p {
    font-size: 0.9rem;
  }

  p:last-of-type {
    font-size: 1rem;
  }
}
</style>

