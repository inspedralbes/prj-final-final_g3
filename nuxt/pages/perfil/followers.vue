<template>
    <div>
        <h1>Followers</h1>
        <div v-for="follower in followers">
            <CardUser :user="follower.follower" />
        </div>
        {{ following }}
    </div>
</template>

<script>
import { useStores } from '@/stores/counter.js';
import userManager from '@/managers/userManager.js';

export default {
    data() {
        return {
            store: useStores(),
            followers: computed(() => this.store.userInfo.followersUsers.followers),
            following: computed(() => this.store.userInfo.followingUsers.followed),
        }
    },
    mounted() {
        if (!this.store.getLoggedIn()) return this.$router.push('/join');
        if (!this.followers) this.getFollowers();
        if (!this.following) this.getFollowing();
    },
    methods: {
        async getFollowers() {
            await userManager.getFollowers();
        },
        async getFollowing() {
            await userManager.getFollowed();
        }
    }
}
</script>

<style scoped></style>