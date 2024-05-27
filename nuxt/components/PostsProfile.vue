<template>
    <section class="w-[90%] mx-auto overflow-hidden" ref="mySection">
        <transition-group name="fade" tag="div" class="relative">
            <article v-for="post in posts" :key="post._id" class="flex flex-col gap-2 bg-black rounded mb-4">
                <header class=" flex justify-between items-center py-2 px-3">
                    <div class="flex justify-center items-center gap-3">
                        <img class="size-12 rounded-full object-cover" :src="this.getImage()">
                        <div class="flex flex-col">
                            <div class="flex items-center gap-3">
                                <h3 class="font-bold">{{ userInfo.name }}</h3>
                                <p class="text-xs text-gray-300">Fa 22h</p>
                            </div>
                            <p class="text-sm">@{{ userInfo.nickname }}</p>
                        </div>
                    </div>
                    <PostDropDown @postDeleted="deletePostAnim($event)" :postId="post._id" />
                </header>

                <NuxtLink :to="`/post/${post._id}`">
                    <p class="px-3 text-sm">{{ post.content }}</p>
                </NuxtLink>
                <button @click="mostrarImageModal(post.image)">
                    <img class="px-3 rounded" :src="url_mongo + '/' + post.image" alt="">
                </button>

                <footer class="flex items-center gap-6 px-3 py-2">
                    <button @click="mostrarReplyModal(post)" class="flex items-center gap-1 text-sm">
                        <IconsMessage class="size-5" />
                        <p>{{ post.comments.length }}</p>
                    </button>

                    <button @click="clickLike(post._id)" class="flex items-center gap-1 text-sm">
                        <IconsHeartFill v-if="post.liked" class="size-5 text-red-500" />
                        <IconsHeart v-else class="size-5" />
                        <p>{{ post.likes.length }}</p>
                    </button>
                </footer>
            </article>
        </transition-group>
    </section>

    <transition name="fadeReply" tag="div">
        <ReplyPost v-if="replyPostModal" @close="mostrarReplyModal" @replyed="increaseComments($event)"
            :post="this.postReply" :name="this.userInfo.name" :nickname="userInfo.nickname" :avatar="this.userInfo.avatar"/>
    </transition>

    <transition name="fadeReply" tag="div">
        <OpenImage v-if="imageIsOpen" @close="mostrarImageModal" :image="postImage" />
    </transition>

</template>

<script>
import { useStores } from '~/stores/counter';
import comManager from '@/managers/comManager.js';

export default {

    data() {
        return {
            store: useStores(),
            userInfo: useStores().userInfo,
            posts: [],
            replyPostModal: false,
            postReply: null,
            imageIsOpen: false,
            postImage: null,
            url_mongo: this.$config.public.ENV === 'development' ? this.$config.public.MONGO_API_PROD_URI : this.$config.public.MONGO_API_DEV_URI,
        }
    },

    methods: {
        mostrarImageModal(image) {
            this.imageIsOpen = !this.imageIsOpen
            this.postImage = image
        },

        async getPosts() {
            this.posts = await comManager.getPosts(this.userInfo.id)
            if (this.posts.length != 0) {
                this.posts.reverse()
                console.log("POSTS: " + JSON.stringify(this.posts))
            }

            this.posts = this.posts.map(post => ({
                ...post,
                liked: false,
            }));
            this.getLikesPosts()
        },

        async getLikesPosts() {
            this.likedPosts = await comManager.getLikePosts()

            for (let i = 0; i < this.posts.length; i++) {
                for (let j = 0; j < this.likedPosts.length; j++) {
                    if (this.posts[i]._id === this.likedPosts[j]) {
                        this.posts[i].liked = true;
                    }
                }
            }
        },

        clickLike(id) {
            for (let i = 0; i < this.posts.length; i++) {
                if (this.posts[i]._id === id) {
                    if (this.posts[i].liked) {
                        comManager.unlikePost(id)

                        for (let i = 0; i < this.posts.length; i++) {
                            if (this.posts[i]._id === id) {
                                this.posts[i].likes.length--;
                                this.posts[i].liked = false;
                            }
                        }
                    } else {
                        comManager.likePost(id)
                        for (let i = 0; i < this.posts.length; i++) {
                            if (this.posts[i]._id === id) {
                                this.posts[i].likes.length++;
                                this.posts[i].liked = true;
                            }
                        }
                    }
                }
            }
        },

        deletePostAnim(id) {
            this.posts = this.posts.filter(post => post._id !== id)
        },

        mostrarReplyModal(post) {
            this.postReply = post
            this.replyPostModal = !this.replyPostModal
            this.$refs.mySection.classList.toggle('no-scroll');
        },

        increaseComments(id) {
            console.log(id)
            for (let i = 0; i < this.posts.length; i++) {
                if (this.posts[i]._id === id) {
                    this.posts[i].comments.length++;
                }
            }
        },
        getImage() {
            if (!this.userInfo.avatar) {
                return `/img/standard_pfp.jpg`
            } else {
                return `${this.$config.public.IMAGE_URI}/${this.userInfo.avatar}`;
            }
        },
    },

    created() {
        console.log(this.userInfo);
        this.getPosts()
    }
}
</script>

<style scoped>
/* ------------------- Animation for the posts ------------------ */
.fade-move,
.fade-enter-active,
.fade-leave-active {
    transition: all 1s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: translateX(50px);
}

.fade-leave-active {
    position: absolute;
}

/* ------------------- Animation for the reply post modal ------------------ */
.fadeReply-move,
.fadeReply-enter-active,
.fadeReply-leave-active {
    transition: all .3s ease;
}

.fadeReply-enter-from,
.fadeReply-leave-to {
    opacity: 0;
    transform: translateY(-50px);
}

.fadeReply-leave-active {
    position: absolute;
}

.no-scroll {
    overflow: hidden;
    height: 100%;
}
</style>