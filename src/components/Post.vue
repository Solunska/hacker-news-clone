<script setup>
import CommentsList from '@/components/CommentsList.vue';
import { defineProps } from 'vue';

const { title, score, account, time, link, comments } = defineProps(['title', 'score', 'account', 'time', 'link', 'comments']);

</script>
<template>
    <div class="container">
        <p class="title">{{ title }}</p>
        <div class="info-container">
            <div class="icon-label-container">
                <img src="../assets/heart-icon.svg" alt="score icon">
                <p class="label">{{ score }}</p>
            </div>
            <div class="icon-label-container">
                <img src="../assets/account-icon.svg" alt="account icon">
                <p class="label">{{ account }}</p>
            </div>
            <div class="icon-label-container">
                <img src="../assets/clock-icon.svg" alt="clock icon">
                <p class="label">{{ time }}</p>
            </div>
            <a class="link" :href="link" target="_blank">{{ link }}</a>
        </div>
        <CommentsList :comments="comments" />

    </div>
</template>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    gap: 1em;
    background-color: white;
    padding: 1.5em 3em;
    margin: 1em;
}

.info-container {
    display: flex;
    gap: 2em;
}

.icon-label-container,
a {
    display: flex;
    align-items: center;
    gap: 0.5em;
}

a {
    color: blue;
}

p {
    margin: 0;
}

img {
    width: 1.5em;
}
</style>