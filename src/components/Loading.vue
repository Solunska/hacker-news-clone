<template>
    <div class="loading-container">
        <p>Loading...</p>
    </div>
</template>

<style scoped>
.loading-container {
    display: flex;
    width: 100%;
    height: 80vh;
    align-items: center;
    justify-content: center;
}

.loading-container p {
    font-size: 3em;
    animation: blinker 1.5s linear infinite;
}
</style>