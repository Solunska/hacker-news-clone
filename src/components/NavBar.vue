<script setup>
import { usePaginationStore } from '@/store/pagination';
import { RouterLink } from 'vue-router';
import { ref } from 'vue';
import { useSearchStore } from '@/store/search';

const paginationStore = usePaginationStore();
const searchStore = useSearchStore();

const searchQuery = ref(searchStore.query);
const handleSearch = () => {
    searchStore.setQuery(searchQuery.value);
    paginationStore.resetRange();
};

const resetPage = () => {
    paginationStore.resetRange();
    searchStore.setQuery(''); 
    searchQuery.value = '';  
};
</script>

<template>
    <nav>
        <ul>
            <li>
                <RouterLink to="/?from=0&to=10"
                    @click="resetPage">
                    <img src="@/assets/logo.png" alt="logo of the app">
                    <p>Search Hacker News</p>
                </RouterLink>
            </li>
            <li>
                <img class="search-icon" src="../assets/search-icon.svg" alt="">
                <input v-model="searchQuery" @input="handleSearch" type="text"
                    placeholder="Search stories by title, url, or author">
            </li>
        </ul>
    </nav>
</template>

<style scoped>
nav {
    height: 5em;
    background-color: white;
    padding: 1em 0;
}

ul {
    display: flex;
    align-items: center;
    padding-inline-end: 40px;
    justify-content: space-between;
    margin: 0;
}

ul,
li,
a {
    height: 100%;
    display: flex;
    text-decoration: none;
    gap: 1em;
}

li:nth-of-type(2) {
    height: 60%;
    width: 70%;
    position: relative;
}

p {
    margin: 0;
    font-size: 2em;
    width: 5.5em;
    color: #717171;
}

input {
    width: 100%;
    padding: 0;
    margin: 0;
    border-radius: 2em;
    border: 1px solid #c1c1c1;
    padding: 0.75em;
    padding-left: 3.5em;
    font-size: 1em;
    color: #c1c1c1;
}

input:focus {
    outline: none !important;
    border-color: #ff6600;
}

.search-icon {
    width: 1.75em;
    position: absolute;
    left: 1em;
    top: 50%;
    transform: translateY(-50%);
    font-weight: 600;
}
</style>