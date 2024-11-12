import { defineStore } from "pinia";

// Add a computed property to filter posts based on the search query
export const useSearchStore = defineStore('search', {
    state: () => ({
        query: '',
    }),
    actions: {
        setQuery(query) {
            this.query = query;
        },
    },
    getters: {
        filteredPosts: (state) => {
            return (posts) => {
                if (!state.query) return posts;
                return posts.filter(post => {
                    return (
                        post.title.toLowerCase().includes(state.query.toLowerCase()) ||
                        post.by.toLowerCase().includes(state.query.toLowerCase())
                    );
                });
            };
        },
    },
});
