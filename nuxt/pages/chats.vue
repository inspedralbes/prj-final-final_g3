<template>
    <section class="w-[90vw] min-h-screen mx-auto text-white">
        <header class="h-[10vh] flex justify-between items-center">
            <h1 class="text-4xl">Xats</h1>
            <div class="flex justify-center items-center gap-2">
                <button>
                    <NuxtLink to="/add-chat">
                        <AddChat class="size-6" />
                    </NuxtLink>
                </button>
                <button>
                    <Search class="size-6" />
                </button>
            </div>
        </header>

        <div v-for="chat in chats" :key="chat.id" @click="goToChat(chat)">
            <main class="flex justify-between items-center gap-2">
                <img class="size-16 rounded-full object-cover" src="https://thumbs.web.sapo.io/?W=800&H=0&delay_optim=1&epic=NDFjSdwqImaET1gQCMUsNp5Qavn4PlLFQyCWKmycNTnIrB2+LwIWzyTNyDw1vKtb1IpZFcVQrYXXHk79sdT61tq23+ULbUSFnEiSEsC5SgPiLHE=" alt="">
                <div class="flex flex-col justify-center items-start gap-1 max-w-64">
                    <h2 class="font-bold">{{chat.nickname}}</h2>
                    <p v-if="chat.messageCount !== 0" class="text-sm">Tens missatges sense llegir</p>
                    <p v-else class="text-sm">{{chat.lastMessage.content}}</p>
                </div>
                <div class="flex flex-col justify-center items-center gap-2">
                    <p class="text-xs text-[#ADADAD]">{{ getTimeDifference(chat.lastMessage.sent_at) }}</p>
                    <p class="text-sm rounded-full bg-primary size-6 flex justify-center items-center">{{chat.messageCount}}</p>
                </div>
            </main>
        </div>
        <div class="bg-[#D9D9D9]/20 w-full h-[1px] rounded-full my-4"></div>
    </section>
    <Menu />
</template>

<script>
import AddChat from '~/components/Icons/AddChat.vue'
import Search from '~/components/Icons/Search.vue'
import { useStores } from '~/stores/counter'
import comChat from '@/managers/chatManager.js';
import { socket } from '../socket';

    export default {
        data(){
            return {
                store: useStores(),
                chats: []
            }
        },
        methods: {
            async getChats(){
                const chats = await comChat.getChats(this.store.getId());
                chats.forEach(async chat => {
                    var userId = 0;
                    chat.username = '';
                    chat.avatar = '';
                    if (chat.user_id != this.store.getId()) {
                        userId = chat.user_id;
                    } else {
                        userId = chat.contact_id;
                    }
                    const userChat = await comChat.getUserChats(userId);
                    chat.nickname = userChat.nickname;
                    chat.avatar = userChat.avatar;
                    if (chat.messageCount == 0) {
                        await comChat.getLastMessage(chat._id).then(message => {
                            console.log(message);
                            chat.lastMessage = message;
                        });
                    }
                    this.chats.push(chat);
                });
            },
            goToChat(chat){
                const user = {
                    id: 0,
                    nickname: chat.nickname,
                    avatar: chat.avatar
                }

                if (chat.user_id != this.store.getId()) {
                    user.id = chat.user_id;
                } else {
                    user.id = chat.contact_id;
                }
                this.store.setChatUser(user);
                socket.emit('joinChat', chat._id);
                this.$router.push('/chat');

            },
            getTimeDifference(sentAt) {
                const now = new Date();
                const sentDate = new Date(sentAt);
                const diffInSeconds = (now - sentDate) / 1000;

                const secondsInMinute = 60;
                const secondsInHour = secondsInMinute * 60;
                const secondsInDay = secondsInHour * 24;
                const secondsInWeek = secondsInDay * 7;
                const secondsInMonth = secondsInDay * 30;
                const secondsInYear = secondsInDay * 365;

                if (diffInSeconds < secondsInMinute) {
                    return `Fa ${Math.floor(diffInSeconds)} segons`;
                } else if (diffInSeconds < secondsInHour) {
                    return `Fa ${Math.floor(diffInSeconds / secondsInMinute)} minuts`;
                } else if (diffInSeconds < secondsInDay) {
                    return `Fa ${Math.floor(diffInSeconds / secondsInHour)} hores`;
                } else if (diffInSeconds < secondsInWeek) {
                    return `Fa ${Math.floor(diffInSeconds / secondsInDay)} dies`;
                } else if (diffInSeconds < secondsInMonth) {
                    return `Fa ${Math.floor(diffInSeconds / secondsInWeek)} setmanes`;
                } else if (diffInSeconds < secondsInYear) {
                    return `Fa ${Math.floor(diffInSeconds / secondsInMonth)} mesos`;
                } else {
                    return `Fa ${Math.floor(diffInSeconds / secondsInYear)} anys`;
                }
            }
        },
        
        components: {
            AddChat,
            Search,
            
        },
        mounted() {
            if(!this.store.getLoggedIn()) return this.$router.push('/join');
            this.getChats();
        }
    }
</script>
