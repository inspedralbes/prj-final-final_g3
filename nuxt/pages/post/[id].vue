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
                    src="https://hips.hearstapps.com/hmg-prod/images/phineas-and-ferb-1590490321.jpg" alt="">
                <div>
                    <h2 class="font-bold">User name</h2>
                    <p class="text-sm text-gray-400">@nickname</p>
                </div>
            </header>
            <article>
                <p>{{ post.content }}</p>
                <img class="rounded" src="https://h2.gifposter.com/bingImages/OceanDrive_EN-US3763740504_1920x1080.jpg"
                    alt="">
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
            <p class="mb-2 px-1 text-sm text-gray-500">Respondiendo a <span class="text-blue-400">@nickname</span></p>
            <div class="flex items-start gap-3">
                <img class="size-12 rounded-full object-cover"
                    src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/4bfe3034-0815-4837-8428-e8e9d8cb3807/dg2octu-40764d88-39cd-48c2-8742-b8924ad68130.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzRiZmUzMDM0LTA4MTUtNDgzNy04NDI4LWU4ZTlkOGNiMzgwN1wvZGcyb2N0dS00MDc2NGQ4OC0zOWNkLTQ4YzItODc0Mi1iODkyNGFkNjgxMzAuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.Rf4kIJqwoe-u2-qMRW1rCjCDwsnO8-79KTZLQE0Vcd0"
                    alt="">
                <textarea ref="textarea" v-model="comment" @input="autoGrow"
                    class="w-full bg-transparent outline-none flex-grow resize-none" autofocus
                    placeholder="Publica tu respuesta..."></textarea>

                <button @click="sendReply"
                    class="bg-primary rounded-full px-4 py-1 font-semibold text-sm hover:bg-primary/80 transition duration-200">Reply</button>
            </div>
        </article>

        <article v-for="comment in comments" class="my-10">
            <header class="flex gap-3 items-center mb-3">
                <img class="size-12 rounded-full object-cover"
                    src="https://prod.assets.earlygamecdn.com/images/MultiVersus-Finn.jpg?transform=banner2x_webp"
                    alt="">
                <div>
                    <h2 class="font-bold">User name</h2>
                    <p class="text-sm text-gray-400">@nickname</p>
                </div>
            </header>
                <p>{{ comment.content }}</p>
        </article>

    </section>



</template>

<script>
import axios from 'axios'
import comManager from '@/managers/comManager.js';

export default {
    data() {
        return {
            postId: this.$route.params.id,
            post: {},
            comments: [],
            comment: ''
        }
    },

    methods: {
        async getPost() {
            try {
                const response = await axios.get(`http://localhost:8086/posts/${this.postId}`)
                this.post = response.data;
                console.log(this.post)
                this.getComments()
            } catch (error) {
                console.error(error)
            }
        },

        async getComments() {
            try {
                const response = await axios.get(`http://localhost:8086/comments?postId=${this.postId}`)
                this.comments = response.data.reverse();
                console.log(this.comments)
            } catch (error) {
                console.error(error)
            }
        },

        async sendReply() {
            await comManager.commentPost(this.post._id, this.comment);
            console.log("Comentario enviado")
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
    }
}
</script>