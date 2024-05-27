<template>
    <div
        class="w-full sticky top-0 p-4 z-[50] text-white flex justify-around items-center bg-[#212121] backdrop-blur-lg">
        <div class="w-full flex flex-row text-center items-center justify-between m-4">
            <NuxtLink to="/events">
                <Logo class="size-16" />
            </NuxtLink>
            <h1 class='text-4xl font-bold text-white uppercase'>Spottunes</h1>
            <div class="flex flex-row gap-x-4">
                <Icons-Search class="size-8 cursor-pointer" @click="sliderUsers = true" />
                <Logout v-if="store.getLoggedIn()" class="size-8" />
            </div>
        </div>

        <!-- Barra de busqueda de usuarios -->
        <USlideover v-model="sliderUsers" class="scroll-auto">
            <div class="flex justify-center mt-9">
                <input v-model="param" @input="searchUsers" type="text" id="simple-search"
                    class="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-[90%] ps-3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Cerca usuaris..." required />
            </div>

            <!-- Lista de usuarios que devuelve el buscador -->
            <main class="flex flex-col justify-center items-center mt-8 space-y-4">
                <div v-if="!empty" v-for="user in filteredUsers" :key="user.id" class="w-[90%]">
                    <CardUser class="text-black" :user="user" />
                </div>
                <div v-if="this.empty" class="flex justify-center items-center gap-1">
                    <h2 class="font-bold m-5">{{ message }}</h2>
                </div>
            </main>
        </USlideover>

    </div>
</template>

<script>
import { useStores } from '~/stores/counter';
import comManager from '~/managers/comManager';

export default {
    data() {
        return {
            store: useStores(),
            sliderUsers: false,
            filteredUsers: [],
            users: [],
            empty: false,
            message: '',
            param: '',
        }
    },
    methods: {
        async searchUsers() {
            const response = await comManager.searchUsers(this.param);
            if (response.data.length > 0) {
                this.empty = false;
                this.users = response.data;
                this.filteredUsers = this.users.map(user => ({ id: user.id, nickname: user.nickname, avatar: user.avatar }));
            } else {
                this.empty = true;
                this.message = response.data.message;
            }
        },
    }
}
</script>

<style scoped></style>