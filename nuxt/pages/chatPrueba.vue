<template>
    <div>
        <h1>Chat Prueba</h1>
        <input type="text" style="border: 1px solid black;" v-model="message" @keyup.enter="sendMessage()">
        <ul>
            <li v-for="msg in messages" :key="msg">{{ msg }}</li>
        </ul>
    </div>
</template>

<script>
import { socket } from '../socket';
import { useStores } from '@/stores/counter';

export default {
    data() {
        return {
            messages: [],
            message: '',
            store: useStores()
        }
    },
    methods: {
        sendMessage() {
            socket.emit('message', this.message);
            this.message = '';
        }
    },
    mounted(){
        if(!this.store.getLoggedIn()) return this.$router.push('/join');

        socket.on('message', (message) => {
            this.messages.push(message);
        });
    }
}
</script>