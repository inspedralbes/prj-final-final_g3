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

export default {
    data() {
        return {
            messages: [],
            message: ''
        }
    },
    methods: {
        sendMessage() {
            socket.emit('message', this.message);
            this.message = '';
        }
    },
    mounted(){
        socket.on('message', (message) => {
            this.messages.push(message);
        });
    }
}
</script>