<script setup>
import Post from '@/components/Post.vue';
import { usePaginationStore } from '../store/pagination.js'
import { fetchTopStories, loadPosts } from '../../apiService';
import { ref, watch, onMounted } from 'vue';
import Loading from './Loading.vue';
import { useRouter, useRoute } from 'vue-router';
import { cacheData, getCachedData } from '@/utils/localStorage.js';

const paginationStore = usePaginationStore();
const postsIDs = ref([]);
const posts = ref(null);

const router = useRouter();
const route = useRoute();

onMounted(async () => {
    const cacheKey = `api-cache-${paginationStore.from}-${paginationStore.to}`;
    const cachedData = getCachedData(cacheKey);

    if (cachedData) {
        postsIDs.value = await fetchTopStories();
        posts.value = cachedData;
    } else {
        postsIDs.value = await fetchTopStories();
        posts.value = await loadPosts(postsIDs.value, paginationStore.from, paginationStore.to);
        cacheData(cacheKey, posts.value);
    }
});


watch(() => [paginationStore.from, paginationStore.to], async () => {
    const cacheKey = `api-cache-${paginationStore.from}-${paginationStore.to}`;
    const cachedData = getCachedData(cacheKey);
    console.log('Pagination change:', paginationStore.from, paginationStore.to);
    console.log('Cached data for new page:', cachedData);
    router.push({ path: route.path, query: { from: paginationStore.from, to: paginationStore.to } });

    if (cachedData) {
        posts.value = cachedData;
    } else {
        posts.value = await loadPosts(postsIDs.value, paginationStore.from, paginationStore.to);
        cacheData(cacheKey, posts.value);
    }
});


console.log(posts);

</script>

<template>
    <div v-if="posts">
        <h1>Top Stories</h1>
        <Post v-for="post in posts" :key="post.id" :postId="post.id" :title="post.title" :score="post.score"
            :account="post.by" :time="post.time" :link="post.url" :comments="post.comments" />
        <div class="pagination">
            <button @click="paginationStore.decrementRange" :disabled="paginationStore.from <= 0">Previous</button>
            <button @click="paginationStore.incrementRange"
                :disabled="paginationStore.to >= postsIDs.length">Next</button>
        </div>
    </div>
    <Loading v-else />
</template>

<style scoped>
h1 {
    margin: 1em;
}

.pagination {
    display: flex;
    justify-content: space-between;
    margin: 1em;
}

button {
    padding: 0.5em 1em;
    background-color: #ff6600;
    color: white;
    border: none;
    cursor: pointer;
    font-size: 2em;
}

button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}

@keyframes blinker {
    50% {
        opacity: 0;
    }
}
</style>