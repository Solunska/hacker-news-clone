<script setup>
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';
import { formatDate } from '@/utils/dateFormater';

const router = useRouter();
const { postId, title, score, account, time, link, comments } = defineProps(['postId', 'title', 'score', 'account', 'time', 'link', 'comments']);

const navigateToPost = () => {
    router.push(`/post-comments/${postId}`)
}

const formattedDate = formatDate(time);

</script>
<template>
    <div class="container">
        <p class="title" @click="navigateToPost">{{ title }}</p>
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
                <p class="label">{{ formattedDate }}</p>
            </div>
            <a class="link" :href="link" target="_blank">{{ link }}</a>
        </div>
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

.title {
    font-size: 1.5em;
    cursor: pointer;
    width: max-content;
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