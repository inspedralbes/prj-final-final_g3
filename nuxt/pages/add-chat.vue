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
            <button type="submit"
                class="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
                <span class="sr-only">Search</span>
            </button>
        </form>

        <!-- Lista de usuarios que devuelve el buscador -->
        <main class="flex justify-center items-center mt-8">
            <div v-if="!this.empty" v-for="user in filteredUsers" :key="user.id" class="justify-center items-start gap-1 max-w-64">
                <!-- <img class="size-16 rounded-full object-cover"
                    src="https://thumbs.web.sapo.io/?W=800&H=0&delay_optim=1&epic=NDFjSdwqImaET1gQCMUsNp5Qavn4PlLFQyCWKmycNTnIrB2+LwIWzyTNyDw1vKtb1IpZFcVQrYXXHk79sdT61tq23+ULbUSFnEiSEsC5SgPiLHE="
                    alt=""> -->
                    <h2 class="font-bold m-5">{{ user }}</h2>
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
            console.log(this.param);
            const response = await comManager.searchUsers(this.param);

            // if (response.status === 200) {
                this.users = response; 
                this.filteredUsers = this.users.map(user => user.nickname);
            // } else {
                this.empty = true;
                this.message = 'No se han encontrado usuarios con ese nombre';
            // }
        }
    },
}
</script>

<style scoped></style>
