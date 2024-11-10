<script setup>
import { defineProps } from 'vue';
import CommentsList from './CommentsList.vue'; 

const {comments} = defineProps(['comments']);
</script>

<template>
    <ul>
        <li v-for="comment in comments" :key="comment.id">
            <p v-html="comment.text"></p>
            <CommentsList v-if="comment.comments && comment.comments.length > 0" :key="comment.id" :comments="comment.comments" />
        </li>
    </ul>
</template>
