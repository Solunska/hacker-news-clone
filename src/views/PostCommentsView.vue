<script setup>
import { useRoute } from 'vue-router';
import { fetchPostDataWithComments } from '../../apiService';
import { onMounted, ref } from 'vue';
import CommentsList from '@/components/CommentsList.vue';
import Loading from '@/components/Loading.vue';
import Post from '@/components/Post.vue';
import NavBar from '@/components/NavBar.vue';
import { cacheData, getCachedData } from '@/utils/indexDB';

const route = useRoute();
const postId = parseInt(route.params.id);

const post = ref(null);

onMounted(async () => {
    const cacheKey = `api-cache-${postId}`;
    const cachedPost = await getCachedData(cacheKey);

    if (cachedPost) {
        post.value = cachedPost;
    } else {
        post.value = await fetchPostDataWithComments(postId);
        cacheData(cacheKey, post.value);
    }
});

</script>

<template>
    <NavBar />
    <div v-if="post">
        <Post :postId="post.id" :title="post.title" :score="post.score" :account="post.by" :time="post.time"
            :link="post.url" />
        <CommentsList :comments="post.comments" />
    </div>
    <Loading v-else />
</template>

<style scoped></style>