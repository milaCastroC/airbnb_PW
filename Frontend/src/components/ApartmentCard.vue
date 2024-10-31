<!-- AparmentCard.vue -->
<template>
    <div class="apartment-container">
        <h3 class="title">{{ apartment.title }}</h3>
        <img :src="apartment.img" :alt="apartment.title">
        <p>{{ apartment.description }}</p>
        <p>{{ apartment.price }}</p>
        <p>{{ apartment.description }}</p>
    </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import type { Apartment } from '../interfaces/Apartment';

export default defineComponent({
    name: 'ApartmentCard',
    props: {
        apartment: {
            type: Object as PropType<Apartment>,
            required: true,
        },
    }
});
</script>

<style scoped>

.apartment-container {
    border: 1px solid #ddd; /* Borde suave alrededor de la tarjeta */
    border-radius: 8px; /* Bordes redondeados */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Sombra para dar profundidad */
    padding: 16px;
    max-width: 300px; /* Ancho fijo para la tarjeta */
    margin: 16px auto; /* Espacio alrededor de la tarjeta */
    text-align: center; /* Centra el contenido */
    background-color: #fff; /* Fondo blanco */
}

.apartment-container .title {
    font-size: 1.25rem;
    font-weight: bold;
    color: #333; /* Color del título */
    margin-bottom: 8px; /* Espacio debajo del título */
}

.apartment-container img {
    width: 100%; /* Imagen ajustada al ancho del contenedor */
    height: auto;
    border-radius: 4px; /* Bordes suaves en la imagen */
    margin-bottom: 12px;
}

.apartment-container p {
    color: #555; /* Color del texto */
    margin: 4px 0; /* Espacio vertical entre párrafos */
    font-size: 1rem; /* Tamaño de letra */
}

.apartment-container p:last-of-type {
    font-weight: bold;
    color: #008080; /* Color especial para el precio */
    font-size: 1.1rem;
}

</style>