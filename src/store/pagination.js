import { defineStore } from 'pinia';

export const usePaginationStore = defineStore('pagination', {
    state: () => ({
        from: 0,
        to: 10,
    }),
    actions: {
        setRange(from, to) {
            this.from = from;
            this.to = to;
        },
        incrementRange() {
            this.from += 10;
            this.to += 10;
        },
        decrementRange() {
            this.from -= 10;
            this.to -= 10;
        },
        resetRange() {
            this.from = 0;
            this.to = 10;
        }
    }
});