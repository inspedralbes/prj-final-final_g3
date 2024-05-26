<template>
    <div>
        <Header />
        <div class="flex flex-row w-fit-content justify-center items-center m-2">
            <NuxtLink to="/perfil">
                <IconsLeftArrow class="h-full" />
            </NuxtLink>
            <UTabs v-model="type" :items="[{ label: 'Seguidors' }, { label: 'Seguits' }]" class="mx-2 w-2/3"></UTabs>
        </div>
        <div v-if="type === 0 && followers.length != 0" v-for="follower in followers"
            class="w-full flex flex-col justify-center items-center">
            <CardUser class="w-full" :user="follower.follower" />
            <hr>
        </div>
        <div v-else-if="type === 0 && followers.length === 0" class="flex justify-center items-center">
            <h2 v-if="checkUser" class="font-bold">No tens seguidors</h2>
            <h2 v-else class="font-bold">Aquest usuari no té seguidors</h2>

        </div>
        <div v-else-if="type === 1 && following.length != 0" v-for="followed in following"
            class="w-full flex flex-col justify-center items-center">
            <CardUser class="w-full" :user="followed.followed" />
            <hr>
        </div>
        <div v-else-if="type === 1 && following.length === 0" class="flex justify-center items-center">
            <h2 v-if="checkUser" class="font-bold">No segueixes a ningú</h2>
            <h2 v-else class="font-bold">Aquest usuari no segueix a ningú</h2>
        </div>
    </div>
    <Menu />
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
            oFollowing: computed(() => this.store.otherUserInfo.followingUsers.followed) || [],
            oFollowers: computed(() => this.store.otherUserInfo.followersUsers.followers) || [],
            type: this.$route.params.type === 'followers' ? 0 : 1,
            user: this.$route.params.username
        }
    },
    mounted() {
        if (!this.store.getLoggedIn()) return this.$router.push('/join');
        if (this.checkUser) {
            if (!this.followers) this.getFollowers();
            if (!this.following) this.getFollowing();
        } else {
            if (!this.oFollowers) this.getFollowers();
            if (!this.oFollowing) this.getFollowing();
        }
    },
    methods: {
        async getFollowers() {
            await userManager.getFollowers(this.store.otherUserInfo.id);
        },
        async getFollowing() {
            await userManager.getFollowed(this.store.otherUserInfo.id);
        }
    },
    computed: {
        checkUser() {
            return this.store.userInfo.username === this.user
        },
    }
}
</script>

<style scoped></style>