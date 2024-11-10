<script setup>
import { defineProps } from 'vue';
const { img, alt, label } = defineProps(['img', 'alt', 'label']);
</script>

<template>
    <div>
        <img :src="require(`@/assets/${img}`)"  :alt="alt">
        <p class="label">{{ label }}</p>
    </div>
</template>

<style scoped>
div {
    display: flex;
    gap: 0.5em;
}

p {
    margin: 0;
}
</style>