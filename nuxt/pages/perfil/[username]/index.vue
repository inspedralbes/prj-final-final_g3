<template>
    <div v-if="loader"
        class="h-full w-full fixed inset-y-0 right-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <Loader />
    </div>
    <main v-if="!loader" class='bg-[#212121] flex flex-col gap-10 min-h-screen '>
        <Header />
        <section class='bg-[#212121] flex flex-col items-center gap-6'>
            <article class='w-full px-2 py-4 flex justify-around items-center'>
                <img class='size-24 rounded-full object-cover' :src="getImage" alt="" />
                <div class='flex flex-col justify-center gap-4'>
                    <h1 class='text-xl font-semibold text-white'>{{ User.nickname }}</h1>
                    <div class='flex justify-center items-center gap-6'>
                        <div>
                            <!-- <NuxtLink to="/perfil/followers"> -->
                            <p class="text-white">{{ User.followers }}</p>
                            <p class='text-xs text-white/60'>Seguidors</p>
                            <!-- </NuxtLink> -->
                        </div>
                        <div>
                            <!-- <NuxtLink to="/perfil/following"> -->
                            <p class="text-white">{{ User.following }}</p>
                            <p class='text-xs text-white/60'>Seguits</p>
                            <!-- </NuxtLink> -->
                        </div>
                        <div>
                            <p class="te+xt-white">5</p>
                            <p class='text-xs text-white/60'>Esdeveniments</p>
                        </div>
                    </div>
                </div>
            </article>
        </section>

        <section class='flex flex-col gap-4'>
            <div class='flex justify-center gap-8'>

                <button class="text-white"
                    :class="selectedSection === 'Posts' ? 'border-b-2 border-b-white' : 'opacity-60'"
                    @click="setSelectedSection('Posts')">
                    Posts
                </button>
                <button class="text-white"
                    :class="selectedSection === 'Eventos' ? 'border-b-2 border-b-white' : 'opacity-60'"
                    @click="setSelectedSection('Eventos')">
                    Esdeveniments
                </button>
                <button class="text-white"
                    :class="selectedSection === 'Gustos' ? 'border-b-2 border-b-white' : 'opacity-60'"
                    @click="setSelectedSection('Gustos')">
                    Gustos
                </button>
            </div>

            <PostsProfile profile="otro" class="" v-if="selectedSection === 'Posts'" />
            <EventosProfile profile="otro" v-if="selectedSection === 'Eventos'" />
            <GustosProfile profile="otro" v-if="selectedSection === 'Gustos'" />
        </section>
    </main>
    <Menu v-if="!loader" />
</template>

<script>
import userManager from '~/managers/userManager';
import eventManager from '~/managers/eventManager';
import { useStores } from '~/stores/counter';

export default {

    data() {
        return {
            selectedSection: 'Posts',
            User: {
                store: useStores(),
                id: useStores().otherUserInfo.id,
                avatar: useStores().otherUserInfo.avatar,
                nickname: useStores().otherUserInfo.nickname,
                name: useStores().otherUserInfo.name,
                followers: useStores().otherUserInfo.followersUsers.count,
                following: useStores().otherUserInfo.followingUsers.count,
            },
            store: useStores(),
            loader: false

        }
    },

    methods: {
        setSelectedSection(section) {
            this.selectedSection = section
        },
        async getEvents() {
            const eventos = await eventManager.getLikeEvents(this.User.id);
            this.store.setOtherUserInfoEvents(eventos)
        },
        async getFollowers() {
            await userManager.getFollowers(this.id);
        },
        async getFollowing() {
            await userManager.getFollowed(this.id);
        },
    },
    async mounted() {
        if (!this.store.getLoggedIn()) return this.$router.push('/join');
        this.loader = true
        this.loader = true;
        try {
            await this.getFollowers();
            await this.getFollowing();
            await this.getEvents();
        } catch (error) {
            console.error("Error while fetching data:", error);
        } finally {
            console.log("Data fetched successfully");
            this.loader = false;
        }
    },
    computed: {
        getImage() {
            if (!this.User.avatar) {
                return `/img/standard_pfp.jpg`
            } else {
                return `${this.$config.public.IMAGE_URI}/${this.User.avatar}`;
            }
        }
    }
}
</script>