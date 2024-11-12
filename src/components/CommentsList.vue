<script setup>
import { defineProps } from 'vue';
import CommentsList from './CommentsList.vue';
import { formatDate } from '@/utils/dateFormater';

const { comments } = defineProps(['comments']);

</script>

<template>
    <ul>
        <li v-for="comment in comments" :key="comment.id">
            <div class="container">
                <h4>{{ comment.by }}</h4>
                <p>{{ formatDate(comment.time) }}</p>
            </div>
            <p v-html="comment.text"></p>
            <CommentsList v-if="comment.comments && comment.comments.length > 0" :key="comment.id"
                :comments="comment.comments" />
        </li>
    </ul>
</template>

<style scoped>
.container {
    display: flex;
    justify-content: space-between;
}


li {
    background-color: #f9f9f9;
    margin: 1em 0;
    padding: 1em;
    list-style: none;
    border-radius: 8px;
    font-size: 1rem;
}

li p {
    color: #333;
    line-height: 1.6;
}

li p.v-html {
    white-space: pre-line;
}

ul {
    margin: 1em;
    padding-left: 0;
}

li>ul {
    margin-top: 1em;
    margin-left: 2em;
    border-left: 3px solid #888;
}

li>ul li {
    background-color: #fff;
    padding: 0.8em;
    box-shadow: none;
    margin-bottom: 1em;
}

li>ul li p {
    font-size: 0.95rem;
}
</style>
