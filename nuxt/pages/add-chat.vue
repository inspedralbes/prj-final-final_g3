<template>
    <div>
        <!-- Barra de busqueda -->
        <form class="flex items-center max-w-sm mx-auto mt-9">
            <label for="simple-search" class="sr-only">Search</label>
            <div class="relative w-full">
                <input v-model="param" @input="searchUsers" type="text" id="simple-search"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-3 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Busca a usuarios para inicar un chat..." required />
            </div>
        </form>

        <!-- Lista de usuarios que devuelve el buscador -->
        <main class="flex justify-center items-center mt-8">
            <div v-if="!this.empty" v-for="user in filteredUsers" :key="user.id" class="justify-center items-start gap-1 max-w-64">
                <!-- <img class="size-16 rounded-full object-cover"
                    src="{{ user.avatar }}"
                    alt=""> -->
                    <NuxtLink :to="'/chat'" :user="user">
                        <h2 class="font-bold m-5">{{ user.nickname }}</h2>
                    </NuxtLink>

            </div>
            <div v-if="this.empty" class="flex justify-center items-center gap-1">
                <h2 class="font-bold m-5">{{ message }}</h2>
            </div>
        </main>


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

            if(response.data.length > 0) {
                this.empty = false;
                this.users = response.data; 
                console.log(this.users);
                this.filteredUsers = this.users.map(user => ({ id: user.id, nickname: user.nickname, avatar: user.avatar}));
            } else {
                this.empty = true;
                this.message = response.data.message;
            }
        }
    },
}
</script>

<style scoped></style>
