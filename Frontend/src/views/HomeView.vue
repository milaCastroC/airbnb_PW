<!-- src/views/HomeView.vue -->
<template>
  <div>
    <h1>Available Apartments</h1>
    <div v-if="apartments.length">
      <div v-for="apartment in apartments" :key="apartment.id" class="apartment">
        <h3>{{ apartment.name }}</h3>
        <p>{{ apartment.description }}</p>
        <button @click="goToDetails(apartment.id)">View Details</button>
      </div>
    </div>
    <p v-else>No apartments available at the moment.</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'HomeView',
  setup() {
    const apartments = ref([]);
    const router = useRouter();

    // Fetch apartments data on component mount
    onMounted(async () => {
      const response = await fetch('https://mockapi.io/apartments');
      apartments.value = await response.json();
    });

    function goToDetails(id: number) {
      router.push({ name: 'ApartmentDetails', params: { id } });
    }

    return { apartments, goToDetails };
  },
});
</script>

<style scoped>
.apartment {
  border: 1px solid #ddd;
  padding: 1rem;
  margin: 0.5rem 0;
}
</style>

