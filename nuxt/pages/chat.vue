<template>
    <section class="w-[90vw] min-h-screen mx-auto text-white">
        <header class="h-[12vh] flex justify-between items-center bg-black">
            <NuxtLink to="/chats">
                <Arrow class="size-6" />
            </NuxtLink>

            <article class="flex justify-center items-center gap-2">
                <div class="relative">
                    <img class="size-16 rounded-full object-cover"
                        src="https://thumbs.web.sapo.io/?W=800&H=0&delay_optim=1&epic=NDFjSdwqImaET1gQCMUsNp5Qavn4PlLFQyCWKmycNTnIrB2+LwIWzyTNyDw1vKtb1IpZFcVQrYXXHk79sdT61tq23+ULbUSFnEiSEsC5SgPiLHE="
                        alt="">
                    <div class="absolute bottom-1 right-1 size-3 rounded-full bg-green-400"></div>
                </div>
                <div class="flex flex-col gap-1 items-start">
                    <h1 class="text-sm font-semibold">User name</h1>
                    <p class="text-xs text-gray-300">Online</p>
                </div>
            </article>
            <div class="flex items-center justify-center gap-2">
                <button>
                    <Flag class="size-6" />
                </button>
                <button>
                    <CircleDots class="size-6" />
                </button>
            </div>
        </header>

        <article ref="messageContainer" class="h-[78vh] flex flex-col items-center pt-10 overflow-y-auto">
            <p class="rounded px-6 py-1 bg-black/30 text-sm mb-4">Ayer</p>
            <div class="w-full flex flex-col items-center gap-2">

                <p class="max-w-[50%] self-start py-2 px-4 rounded-r-xl rounded-t-xl bg-[#828282]">Heyy, vas al concierto de Quevedo ?</p>
                <div v-for="msg in messages" :key="msg.id" :class="{'max-w-[50%] self-end py-2 px-4 rounded-l-xl rounded-tr-xl bg-primary': msg.user_id === store.getId(), 'max-w-[50%] self-start py-2 px-4 rounded-r-xl rounded-t-xl bg-[#828282]': msg.id !== store.getId()}">
                    <p>{{ msg.content }}</p>

                </div>
            </div>
        </article>

        <footer class="h-[10vh] bg-[#4B4B4B] flex justify-center items-center gap-2 px-8">
            <div class="w-full h-8 bg-[#646464] rounded-full flex items-center">
                <button class="rounded-full bg-[#7C7C7C] p-[6px]">
                    <Plus class="size-5 border-white border-2 rounded-full" />
                </button>
                <input type="text" class="w-full h-full bg-transparent pl-3 rounded-full text-sm outline-none"
                    placeholder="Escribe tu mensaje..." @keyup.enter="sendMessage()" v-model="message">
            </div>
            <button class="bg-primary rounded-full p-[6px]">
                <Send class="size-5" />
            </button>
        </footer>
    </section>
</template>

<script>
import Arrow from '~/components/Icons/LeftArrow.vue'
import Flag from '~/components/Icons/Flag.vue'
import CircleDots from '~/components/Icons/CircleDots.vue'
import Send from '~/components/Icons/Send.vue'
import Plus from '~/components/Icons/Plus.vue'
import { socket } from '../socket';
import { useStores } from '@/stores/counter';
import comChat  from '@/managers/chatManager.js';

export default {
    components: {
        Arrow,
        Flag,
        CircleDots,
        Send,
        Plus,
    },
    data() {
        return {
            store: useStores(),
            messages: [],
            message: '',
            pagination:{}
        }
    },
    methods: {
        sendMessage() {
            socketMessage = {
                id: useStores.getId(),
                message: this.message,
                state: 'enviado'
            }
            socket.emit('message', this.message);
            this.message = '';
        }
    },
    mounted() {
        socket.on('message', (message) => {
            this.messages.push(message);
            this.message = {
                chat_id: 1,
                id: this.store.getId(),
                content: this.message
            }
            socket.emit('message', this.message);
            this.message = '';
        },
        genTimeStamp() {
            const actualDate = new Date();
            const year = actualDate.getFullYear().toString();
            const month = (actualDate.getMonth() + 1).toString().padStart(2, '0');
            const day = actualDate.getDate().toString().padStart(2, '0');
            const hours = actualDate.getHours().toString().padStart(2, '0');
            const minutes = actualDate.getMinutes().toString().padStart(2, '0');
            const seconds = actualDate.getSeconds().toString().padStart(2, '0');
            return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
        },
        async fetchMessages() {
            const result = await comChat.getAllMessages(1);
            this.messages = result.data.reverse();
            delete result.data;
            this.pagination = result;
        },
    },
    mounted() {
    if(!this.store.getLoggedIn()) return this.$router.push('/join');
    socket.on('message', (message) => {
        this.messages.push(message);
        this.$nextTick(() => {
            if (this.$refs.messageContainer) {
                this.$refs.messageContainer.scrollTop = this.$refs.messageContainer.scrollHeight;
            }
        });
    });

    this.fetchMessages();
},
    

}
</script>