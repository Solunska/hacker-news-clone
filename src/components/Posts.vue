<script setup>
import Post from '@/components/Post.vue';
import { fetchTopStories, loadPosts } from '../../apiService';
import { ref, watch, onMounted } from 'vue';
import Loading from './Loading.vue';

let postsIDs = [];
const posts = ref(null);
const postRange = ref({
    from: 0,
    to: 10
});

onMounted(async () => {
    postsIDs = await fetchTopStories();
    posts.value = await loadPosts(postsIDs, postRange.value.from, postRange.value.to);
});

watch(postRange.value, async () => {
    posts.value = await loadPosts(postsIDs, postRange.value.from, postRange.value.to);
});

console.log(posts);

</script>

<template>
    <div v-if="posts">
        <h1>Top Stories</h1>
        <Post v-for="post in posts" :key="post.id" :postId="post.id" :title="post.title" :score="post.score"
            :account="post.by" :time="post.time" :link="post.url" :comments="post.comments" />
    </div>
    <Loading v-else />
</template>

<style scoped>
h1 {
    margin: 1em;
}

@keyframes blinker {
    50% {
        opacity: 0;
    }
}
</style>