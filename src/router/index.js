import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import PostCommentsView from "../views/PostCommentsView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home page",
            component: HomeView
        },
        {
            path: "/post-comments/:id",
            name: "post comments page",
            component: PostCommentsView
        }
    ]
});

export default router;