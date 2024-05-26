<template>
    <div>
        <button @click="goToProfile">
            <div class="flex flex-row justify-between items-center">
                <div class="flex flex-row items-center">
                    <img class="size-24 rounded-full object-cover" :src="getImage" alt="Avatar" />
                    <p class="m-2">{{ user.nickname }}</p>
                </div>
                <button v-if="user.id !== store.getId()"
                    class="font-bold px-4 py-1 bg-white text-black rounded-full text-sm h-8 border border-black"
                    @click="followOr">
                    {{ checkIfFollowing ? 'Seguint' : 'Seguir' }}
                </button>
            </div>
        </button>
    </div>
</template>

<script>
import { useStores } from '~/stores/counter';
import userManager from '~/managers/userManager';
import comManager from '@/managers/comManager.js';

export default {
    props: {
        user: {
            type: Object,
            required: true
        },
        type: {
            type: String,
            default: 'followers'
        }
    },
    data() {
        return {
            store: useStores(),
        }
    },
    methods: {
        async followUser() {
            await comManager.follow(this.user.id)
        },
        async unfollowUser() {
            await comManager.unfollow(this.user.id)
        },
        async followOr() {
            if (this.checkIfFollowing) {
                await this.unfollowUser();
            } else {
                await this.followUser();
            }
        },
        goToProfile() {
            this.store.setOtherUserInfo(this.user)
            this.$router.push(`/perfil/${this.user.nickname}`);
        }
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
            return this.store.userInfo.followingUsers.followed.some(followed => followed.followed.id === this.user.id);
        }
    }
}
</script>

<style scoped></style>