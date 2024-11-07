<!-- ApartmentsView.vue -->
<template>
  <div class="apartments-container">
    <div class="apartment-it">
      <ApartmentCard
        v-for="apartment in apartments"
        :key="apartment.id"
        :apartment="apartment"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import ApartmentCard from '../components/ApartmentCard.vue'
import { useApartmentStore } from '../stores/apartmentStore'

export default defineComponent({
  name: 'ApartmentsView',
  components: { ApartmentCard },
  setup() {
    const apartmentStore = useApartmentStore()
    const router = useRouter()

    // Función para navegar a los detalles de un apartamento
    function goToApartmentDetails(id: string) {
      router.push({ name: 'ApartmentDetails', params: { id } })
    }

    onMounted(() => {
      apartmentStore.fetchAllApartments()
    })

    return {
      apartments: computed(() => apartmentStore.apartments),
      loading: computed(() => apartmentStore.loading),
      error: computed(() => apartmentStore.error),
      goToApartmentDetails,
    }
  },
})
</script>

<style scoped>
.apartments-container {
  max-width: 1400px; 
  margin: 0 auto;
  padding: 40px;
}

.apartment-it {
  display: grid;
  grid-template-columns: repeat(3, minmax(350px, 1fr)); 
  gap: 32px;
  justify-content: center;
}

@media (max-width: 1200px) {
  .apartment-it {
    grid-template-columns: repeat(2, minmax(300px, 1fr));
    gap: 24px;
  }

  .apartments-container {
    padding: 30px;
  }
}

@media (max-width: 768px) {
  .apartment-it {
    grid-template-columns: minmax(280px, 1fr);
    gap: 20px;
  }
  
  .apartments-container {
    padding: 20px;
  }
}

@media (max-width: 320px) {
  .apartment-it {
    grid-template-columns: 1fr;
  }
  
  .apartments-container {
    padding: 15px;
  }
}
</style>