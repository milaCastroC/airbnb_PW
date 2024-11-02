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

