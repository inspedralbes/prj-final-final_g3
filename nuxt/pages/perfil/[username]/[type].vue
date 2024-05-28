<template>
    <div>
        <Header />
        <div class="flex flex-row w-fit-content justify-center items-center m-2">
            <NuxtLink :to="checkUser ? '/perfil' : `/perfil/${user}`">
                <IconsLeftArrow class="h-full" />
            </NuxtLink>
            <UTabs v-model="type" :items="[{ label: 'Seguidors' }, { label: 'Seguits' }]" class="mx-2 w-2/3"></UTabs>
        </div>
        <div>
            <div v-if="type === 0 && followers.length != 0" v-for="follower in followers"
                class="w-full flex flex-col justify-center items-center">
                <CardUser class="w-2/3" :user="follower.follower" />
                <hr>
            </div>
            <div v-else-if="type === 0 && followers.length === 0" class="flex justify-center items-center">
                <h2 v-if="checkUser" class="font-bold">No tens seguidors</h2>
                <h2 v-else class="font-bold">Aquest usuari no té seguidors</h2>
            </div>
            <div v-else-if="type === 1 && following.length != 0" v-for="followed in following"
                class="w-full flex flex-col justify-center items-center">
                <CardUser class="w-2/3" :user="followed.followed" />
                <hr>
            </div>
            <div v-else-if="type === 1 && following.length === 0" class="flex justify-center items-center">
                <h2 v-if="checkUser" class="font-bold">No segueixes a ningú</h2>
                <h2 v-else class="font-bold">Aquest usuari no segueix a ningú</h2>
            </div>
        </div>
        <!-- <div v-else>
            <div v-if="type === 0 && oFollowers.length != 0" v-for="follower in oFollowers"
                class="w-full flex flex-col justify-center items-center">
                <CardUser class="w-2/3" :user="follower.follower" />
                <hr>
            </div>
            <div v-else-if="type === 0 && oFollowers.length === 0" class="flex justify-center items-center">
                <h2 class="font-bold">No té seguidors</h2>
            </div>
            <div v-else-if="type === 1 && oFollowing.length != 0" v-for="followed in oFollowing"
                class="w-full flex flex-col justify-center items-center">
                <CardUser class="w-2/3" :user="followed.followed" />
                <hr>
            </div>
            <div v-else-if="type === 1 && oFollowing.length === 0" class="flex justify-center items-center">
                <h2 class="font-bold">No segueix a ningú</h2>
            </div>
        </div> -->
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
            // followers: computed(() => this.store.userInfo.followersUsers.followers),
            // following: computed(() => this.store.userInfo.followingUsers.followed),
            // oFollowing: computed(() => this.store.otherUserInfo.followingUsers.followed) || [],
            // oFollowers: computed(() => this.store.otherUserInfo.followersUsers.followers) || [],
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
            if (!this.followers) this.getOtherFollowers();
            if (!this.following) this.getOtherFollowing();
        }
    },
    methods: {
        async getFollowers() {
            await userManager.getFollowers();
        },
        async getFollowing() {
            await userManager.getFollowed();
        },
        async getOtherFollowers() {
            await userManager.getFollowers(this.store.otherUserInfo.id);
        },
        async getOtherFollowing() {
            await userManager.getFollowed(this.store.otherUserInfo.id);
        }
    },
    computed: {
        checkUser() {
            return this.store.userInfo.username === this.user
        },
        followers() {
            if (this.checkUser) {
                return this.store.userInfo.followersUsers.followers
            } else {
                return this.store.otherUserInfo.followersUsers.followers
            }
        },
        following() {
            if (this.checkUser) {
                return this.store.userInfo.followingUsers.followed
            } else {
                return this.store.otherUserInfo.followingUsers.followed
            }
        }
    }
}
</script>

<style scoped></style>