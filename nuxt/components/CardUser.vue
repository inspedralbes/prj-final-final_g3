<template>
    <div>
        <div class="flex flex-row items-center">
            <img class="size-24 rounded-full object-cover" :src="getImage" alt="Avatar" />
            <p class="m-2">{{ user.nickname }}</p>
        </div>
        <button class="font-bold px-4 py-1 bg-white text-black rounded-full text-sm"></button>
    </div>
</template>

<script>
import { useStores } from '~/stores/counter';
import userManager from '~/managers/userManager';

export default {
    props: {
        user: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            store: useStores(),
        }
    },
    methods: {
        async followUser() {
            await userManager.followUser(this.user.id);
        },
        async unfollowUser() {
            await userManager.unfollowUser(this.user.id);
        },
    },
    computed: {
        getImage() {
            if (!this.user.avatar) {
                return `/img/standard_pfp.jpg`
            } else {
                return `${this.$config.public.IMAGE_URI}/${this.user.avatar}`;
            }
        },
        checkIfFollowing() {
            return this.store.userInfo.followingUsers.followed.includes(this.user.id);
        }
    }
}
</script>

<style scoped></style>