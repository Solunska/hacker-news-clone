<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
    <nav>
        <ul>
            <li>
                <RouterLink to="/">
                    <img src="../assets/logo.png" alt="logo of the app">
                    <p>Search Hacker News</p>
                </RouterLink>
            </li>
            <li>
                <img class="search-icon" src="../assets/search-icon.svg" alt="">
                <input type="text" placeholder="Search stories by title, url, or author">
            </li>
        </ul>
    </nav>
</template>

<style scoped>
nav {
    height: 5em;
    background-color: white ;
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