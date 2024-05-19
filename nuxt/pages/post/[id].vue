<template>
    <section>
        <header class="w-[90%] mx-auto py-4 flex gap-5 items-center">
            <NuxtLink to="/home">
                <IconsLeftArrow class="size-6 bg-black rounded-full bg-opacity-60" />
            </NuxtLink>
            <h1 class="text-xl font-bold">Post</h1>
        </header>
        <main class="w-[90%] mx-auto py-2">
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
            <footer>
                
            </footer>
        </main>
    </section>



</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            postId: this.$route.params.id,
            post: {},
        }
    },

    methods: {
        async getPost() {
            try {
                const response = await axios.get(`http://localhost:8086/posts/${this.postId}`)
                this.post = response.data;
                console.log(this.post)
            } catch (error) {
                console.error(error)
            }
        }
    },

    created() {
        this.getPost()
    }
}
</script>