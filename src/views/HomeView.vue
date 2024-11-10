<script setup>
import NavBar from '@/components/NavBar.vue';
import Posts from '@/components/Posts.vue';
</script>

<template>
    <NavBar />
    <Suspense >
        <template #default>
            <Posts />
        </template>
        <template #fallback>
            <div>
                <p>Loading...</p>
            </div>
        </template>
    </Suspense>

</template>

<style scoped></style>