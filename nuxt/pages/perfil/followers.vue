<template>
    <div>
        <h1>Followers</h1>
    </div>
</template>

<script>
import { useStores } from '@/stores/counter.js';
import comManager from '@/managers/comManager.js';

export default {
    data() {
        return {
            store: useStores(),
            followers: [],
        }
    },
    mounted() {
        this.getFollowers();
    },
    methods: {
        async getFollowers() {
            comManager.getFollowers().then((followers) => {
                this.followers = followers;
            });
        }
    }
}
</script>

<style scoped></style>