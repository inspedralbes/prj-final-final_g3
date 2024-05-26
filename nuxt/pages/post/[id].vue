<template>
    <section class="w-[90%] mx-auto">
        <header class="py-4 flex gap-5 items-center">
            <NuxtLink to="/home">
                <IconsLeftArrow class="size-6 bg-black rounded-full bg-opacity-60" />
            </NuxtLink>
            <h1 class="text-xl font-bold">Post</h1>
        </header>
        <main class="py-2">
            <header class="flex gap-3 items-center mb-3">
                <img class="size-12 rounded-full object-cover"
                    :src="getImage" :alt="'Foto de perfil de ' + infoUser.nickname">
                <div>
                    <h2 class="font-bold">{{ infoUser.name }}</h2>
                    <p class="text-sm text-gray-400">@{{ infoUser.nickname }}</p>
                </div>
            </header>
            <article>
                <p>{{ post.content }}</p>
                <img class="rounded" :src="post.image" alt="">
            </article>
            <footer class="flex justify-between items-center gap-6 px-1 py-2">

                <div class="flex gap-4">
                    <button @click="mostrarModal(post)" class="flex items-center gap-1 text-sm">
                        <IconsMessage class="size-5" />
                        <p>{{ post.comments ? post.comments.length : 0 }}</p>
                    </button>

                    <button @click="clickLike(post._id)" class="flex items-center gap-1 text-sm">
                        <IconsHeartFill v-if="post.liked" class="size-5 text-red-500" />
                        <IconsHeart v-else class="size-5" />
                        <p>{{ post.likes ? post.likes.length : 0 }}</p>
                    </button>
                </div>

                <p class="text-sm text-gray-400">5:27 PM - 31 Abril, 2024</p>
            </footer>
        </main>

        <article class="mt-6 border-t border-b py-2 border-gray-500">
            <p class="mb-2 px-1 text-sm text-gray-500">Responent a <span class="text-blue-400">@{{ infoUser.nickname }}</span></p>
            <div class="flex items-start gap-3">
                <img class="size-12 rounded-full object-cover"
                    :src="store.getAvatar()"
                    alt="">
                <textarea ref="textarea" v-model="comment" @input="autoGrow"
                    class="w-full bg-transparent outline-none flex-grow resize-none" autofocus
                    placeholder="Publica tu respuesta..."></textarea>

                <button @click="sendReply"
                    class="bg-primary rounded-full px-4 py-1 font-semibold text-sm hover:bg-primaryDark transition duration-200">Reply</button>
            </div>
        </article>

        <transition-group name="fade">
            <article v-for="(comment, index) in comments" :key="index" class="my-10">
                <header class="flex gap-3 items-center mb-3">
                    <img class="size-12 rounded-full object-cover"
                        src="https://image.europafm.com/clipping/cmsimages01/2022/08/15/4BFF7A00-9A76-4D79-8271-B056A41AA0BA/borja-escalona-video-grabado-vigo_104.jpg?crop=183,183,x45,y0&width=1200&height=1200&optimize=low&format=webply"
                        alt="">
                    <div>
                        <h2 class="font-bold">Nom d'usuari</h2>
                        <p class="text-sm text-gray-400">@nickname</p>
                    </div>
                </header>
                <p>{{ comment.content }}</p>
            </article>
        </transition-group>
    </section>

</template>

<script>
import axios from 'axios'
import { useStores } from '~/stores/counter';
import comManager from '@/managers/comManager.js';

export default {
    data() {
        return {
            store: useStores(),
            postId: this.$route.params.id,
            post: {},
            comments: [],
            comment: '',
            infoUser: {}
        }
    },

    methods: {
        async getPost() {
            try {
                this.post = await comManager.getPostById(this.postId)
                console.log("Info Post: " + JSON.stringify(this.post))
                await this.getUserInfo(this.post.userId)
                await this.getComments()
            } catch (error) {
                console.error(error)
            }
        },

        async getComments() {
            try {
                this.comments = await comManager.getComments(this.postId)
                this.comments.reverse();
                console.log(this.comments)
            } catch (error) {
                console.error(error)
            }
        },

        async sendReply() {
            await comManager.commentPost(this.post._id, this.comment);
            this.comment = '';
            this.getComments();
            console.log("Comentario enviado")
        },

        async getUserInfo(userId) {
            this.infoUser = await comManager.getUserById(userId, this.store.getToken())
            this.infoUser = this.infoUser.data
            console.log("Info User: " + JSON.stringify(this.infoUser))
        },

        autoGrow() {
            this.$nextTick(() => {
                this.$refs.textarea.style.height = 'auto';
                this.$refs.textarea.style.height = (this.$refs.textarea.scrollHeight) + 'px';
            });
        }
    },

    mounted() {
        this.$nextTick(() => {
            this.$refs.textarea.focus();
        });
        this.getPost()
    },

    computed: {
        getImage() {
            if (!this.infoUser.avatar) {
                return `/img/standard_pfp.jpg`
            } else {
                return `${this.$config.public.IMAGE_URI}/${this.infoUser.avatar}`;
            }
        }
    }
    
}
</script>

<style>
.fade-move,
.fade-enter-active,
.fade-leave-active {
    transition: all .5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: translateY(-50px);
}

.fade-leave-active {
    position: absolute;
}
</style>