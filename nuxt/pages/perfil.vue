<template>
    <div v-if="loader"
        class="h-full w-full fixed inset-y-0 right-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <Loader />
    </div>
    <main v-if="!loader" class='bg-[#212121] flex flex-col gap-10 min-h-screen'>
        <Logout class="absolute top-3 right-5" />

        <section class='bg-[#212121] flex flex-col items-center gap-6'>
            <article class='w-full px-2 py-4 flex justify-around items-center'>
                <img class='size-24 rounded-full object-cover' :src="getImage" alt="" />
                <div class='flex flex-col justify-center gap-4'>
                    <h1 class='text-xl font-semibold text-white'>{{ User.nickname }}</h1>
                    <div class='flex justify-center items-center gap-6'>
                        <div>
                            <p class="text-white">{{ User.followers }}</p>
                            <p class='text-xs text-white/60'>Seguidors</p>
                        </div>
                        <div>
                            <p class="text-white">{{ User.followed }}</p>
                            <p class='text-xs text-white/60'>Seguits</p>
                        </div>
                        <div>
                            <p class="te+xt-white">5</p>
                            <p class='text-xs text-white/60'>Events</p>
                        </div>
                    </div>
                </div>
            </article>

            <NuxtLink to='/edit-profile'
                class='px-4 py-2 font-bold text-black text-sm bg-white rounded-full hover:bg-[#FF8A1E] transition-all duration-300 hover:-translate-y-1'>
                Edita el perfil
            </NuxtLink>
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
                    Eventos
                </button>
                <button class="text-white"
                    :class="selectedSection === 'Gustos' ? 'border-b-2 border-b-white' : 'opacity-60'"
                    @click="setSelectedSection('Gustos')">
                    Gustos
                </button>

            </div>

            <PostsProfile class="" v-if="selectedSection === 'Posts'" />
            <EventosProfile v-if="selectedSection === 'Eventos'" />
            <GustosProfile v-if="selectedSection === 'Gustos'" />
        </section>
    </main>
    <Menu v-if="!loader" />
</template>

<script>
import userManager from '~/managers/userManager';
import { useStores } from '~/stores/counter';

export default {

    data() {
        return {
            selectedSection: 'Posts',
            User: {
                store: useStores(),
                avatar: useStores().userInfo.avatar,
                nickname: useStores().userInfo.nickname,
                name: useStores().userInfo.name,
                followers: '',
                followed: ''
            },
            store: useStores(),
            loader: false

        }
    },

    methods: {
        setSelectedSection(section) {
            this.selectedSection = section
        },
        async getFollowers() {
            const followers = await userManager.getFollowers();
            this.User.followers = followers;
        },
        async getFollowed() {
            const followed = await userManager.getFollowed();
            this.User.followed = followed;
        }
    },
    mounted() {
        if (!this.store.getLoggedIn()) return this.$router.push('/join');

        this.loader = true;
        this.getFollowers().then(() => {
            this.getFollowed().then(() => {
                this.loader = false;
            });

        });
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