<script setup>
import Post from '@/components/Post.vue';
import { usePaginationStore } from '../store/pagination.js'
import { fetchTopStories, loadPostsWithPagination, loadPosts } from '../../apiService';
import { ref, watch, onMounted } from 'vue';
import Loading from './Loading.vue';
import { useRouter, useRoute } from 'vue-router';
import { cacheData, getCachedData } from '@/utils/localStorage.js';
import { useSearchStore } from '@/store/search.js';

const paginationStore = usePaginationStore();
const searchStore = useSearchStore();
const postsIDs = ref([]);
const posts = ref(null);
const allPosts = ref(null);
const hasPagination = ref(true);

const router = useRouter();
const route = useRoute();

let debounceTimeout = null;

const goToTopAndChangePage = (direction) => {
    window.scrollTo(0, 0);

    if (direction === 'prev') {
        paginationStore.decrementRange();
    } else if (direction === 'next') {
        paginationStore.incrementRange();
    }
};

const fetchPosts = async () => {
    const cacheKey = `api-cache-${paginationStore.from}-${paginationStore.to}`;
    const cachedData = await getCachedData(cacheKey);
    if (cachedData) {
        posts.value = cachedData;
    } else {
        posts.value = await loadPostsWithPagination(postsIDs.value, paginationStore.from, paginationStore.to);
        cacheData(cacheKey, posts.value);
    }
};

onMounted(async () => {
    const allCachedData = await getCachedData('all-data');
    postsIDs.value = await fetchTopStories();

    fetchPosts();

    if (allCachedData) {
        allPosts.value = allCachedData;
    } else {
        allPosts.value = await loadPosts(postsIDs.value);
        cacheData('all-data', allPosts.value);
    }
});

watch(() => [paginationStore.from, paginationStore.to], async () => {
    fetchPosts();

    router.push({ path: route.path, query: { from: paginationStore.from, to: paginationStore.to } });

    if (searchStore.query && allPosts.value) {
        posts.value = searchStore.filteredPosts(allPosts.value);
    }
});

watch(() => searchStore.query, (newQuery) => {
    if (debounceTimeout) {
        clearTimeout(debounceTimeout);
    }

    debounceTimeout = setTimeout(() => {
        if (newQuery) {
            posts.value = searchStore.filteredPosts(allPosts.value);
            hasPagination.value = false;
        } else {
            hasPagination.value = true;
            fetchPosts();
        }
    }, 500);
});

console.log(posts);

</script>

<template>
    <div v-if="posts">
        <h1>Top Stories</h1>
        <Post v-for="post in posts" :key="post.id" :postId="post.id" :title="post.title" :score="post.score"
            :account="post.by" :time="post.time" :link="post.url" :comments="post.comments" />
        <div v-if="hasPagination" class="pagination">
            <button @click="goToTopAndChangePage('prev')" :disabled="paginationStore.from <= 0">Previous</button>
            <button @click="goToTopAndChangePage('next')" :disabled="paginationStore.to >= 500">Next</button>
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