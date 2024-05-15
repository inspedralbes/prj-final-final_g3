<template>
    <div>
        <!-- Barra de busqueda -->
            <div class="relative w-full">
                <input v-model="param" @input="searchUsers" type="text" id="simple-search"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-3 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Busca a usuarios para inicar un chat..." required />
            </div>

        <!-- Lista de usuarios que devuelve el buscador -->
        <main class="flex justify-center items-center mt-8">
            <div v-if="!this.empty" v-for="user in filteredUsers" :key="user.id"
                class="justify-center items-start gap-1 max-w-64">
                <!-- <img class="size-16 rounded-full object-cover"
                    src="{{ user.avatar }}"
                    alt=""> -->
                <button @click="goToChat(user)">
                    <h2 class="font-bold m-5">{{ user.nickname }}</h2>
                </button>
            </div>
            <div v-if="this.empty" class="flex justify-center items-center gap-1">
                <h2 class="font-bold m-5">{{ message }}</h2>
            </div>
        </main>

        <router-link to="/chats">
            <svg class="w-auto h-8" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M5 12l14 0" />
                <path d="M5 12l6 6" />
                <path d="M5 12l6 -6" />
            </svg>
        </router-link>
    </div>
    <!-- <Menu /> -->
</template>

<script>
import comManager from '~/managers/comManager';

export default {
    data() {
        return {
            param: '',
            users: [],
            filteredUsers: [],
            empty: false,
            message: '',
        };
    },
    methods: {
        async searchUsers() {
            const response = await comManager.searchUsers(this.param);

            if (response.data.length > 0) {
                this.empty = false;
                this.users = response.data;
                console.log(this.users);
                this.filteredUsers = this.users.map(user => ({ id: user.id, nickname: user.nickname, avatar: user.avatar }));
            } else {
                this.empty = true;
                this.message = response.data.message;
            }
        },
        goToChat(user) {
            this.$router.push({ name: 'chat', params: { id: user.id } });
        },
    },
}
</script>

<style scoped></style>
