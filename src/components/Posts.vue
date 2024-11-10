<script setup>
import Post from '@/components/Post.vue';
import axios from 'axios';
import { ref, watch, onMounted } from 'vue';

let postsIDs = [];
const posts = ref(null);
const postRange = ref({
    from: 0,
    to: 10
});

const fetchTopStories = async () => {
    const response = await axios.get('https://hacker-news.firebaseio.com/v0/topstories.json');
    return response.data;
};

const fetchPostData = async (postId) => {
    const response = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${postId}.json`);
    const postData = response.data;

    if (postData.kids && postData.kids.length > 0) {
        postData.comments = await fetchComments(postData.kids);
    }

    return postData;
};

const fetchComments = async (commentIds) => {
    const commentPromises = commentIds.map(async (commentId) => {
        const response = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${commentId}.json`);
        const commentData = response.data;

        if (commentData.kids && commentData.kids.length > 0) {
            commentData.comments = await fetchComments(commentData.kids);
        }

        return commentData;
    });

    return Promise.all(commentPromises);
};

const loadPosts = async () => {
    const slicedPostIds = postsIDs.slice(postRange.value.from, postRange.value.to);

    const postPromises = slicedPostIds.map(postId => fetchPostData(postId));
    posts.value = await Promise.all(postPromises);
};

onMounted(async () => {
    postsIDs = await fetchTopStories();
    loadPosts();
});

watch(postRange.value, () => {
    loadPosts();
});

</script>

<template>
    <div v-if="posts">
        <h1>Top Stories</h1>
        <Post v-for="post in posts" :key="post.id" :title="post.title" :score="post.score" :account="post.by"
            :time="post.time" :link="post.url" :comments="post.comments" />
    </div>
    <div v-else class="loading-container">
        <p>Loading...</p>
    </div>
</template>

<style scoped>
h1 {
    margin: 1em;
}

.loading-container {
    display: flex;
    width: 100%;
    height: 80vh;
    align-items: center;
    justify-content: center;
}

.loading-container p{
    font-size: 3em;
    animation: blinker 1.5s linear infinite;
}

@keyframes blinker {
  50% {
    opacity: 0;
  }
}
</style>