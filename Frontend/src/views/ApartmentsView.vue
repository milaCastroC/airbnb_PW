<!-- ApartmentsView.vue -->
<template>
    <div class="apartments-container">
        <div class="apartment-it">
            <ApartmentCard
            v-for="apartment in apartments"
            :key = "apartment.id"
            :apartment = "apartment"
            />
            
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue';
import ApartmentCard from '../components/ApartmentCard.vue';
import { useApartmentStore } from '../stores/apartmentStore';


export default defineComponent({
    
    name: 'ApartmentsView',
    components: {ApartmentCard},
    setup(){
        const apartmentStore = useApartmentStore();

        onMounted(() =>{
            apartmentStore.fetchAllApartments()
        });
        
        return {
            apartments: computed(() => apartmentStore.apartments),
            loading: computed(() => apartmentStore.loading),
            error: computed(() => apartmentStore.error),
        }
    }
})

</script>