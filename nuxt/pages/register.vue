<template>
    <main class='w-screen h-screen bg-background'>
        <section class='w-[80vw] h-screen mx-auto flex flex-col gap-10 justify-center'>
            <h1 class='text-4xl font-semibold text-white'>Registra't</h1>
            <form class="flex flex-col gap-6" @submit.prevent="register">
                <input class="bg-transparent border-b border-gray-400 outline-none text-white" type="email"
                    placeholder="Email" v-model="email" />
                <input class="bg-transparent border-b border-gray-400 outline-none text-white" type="text"
                    placeholder="Nom" v-model="name" />
                <input class="bg-transparent border-b border-gray-400 outline-none text-white" type="text"
                    placeholder="Cognoms" v-model="surnames" />
                <input class="bg-transparent border-b border-gray-400 outline-none text-white" type="text"
                    placeholder="Usuari" v-model="nickname" />
                <input class="bg-transparent border-b border-gray-400 outline-none text-white" type="date"
                    placeholder="Data de naixement" v-model="birthdate" />
                <input class="bg-transparent border-b border-gray-400 outline-none text-white" type="password"
                    placeholder="Contrasenya" v-model="password" />
                <input class="bg-transparent border-b border-gray-400 outline-none text-white" type="password"
                    placeholder="Repeteix la contrasenya" v-model="passwordconfirmation" />
                <button
                    class="flex justify-center py-3 font-bold rounded-full bg-gradient-to-r from-orange-600 to-yellow-600">
                    <span v-if="!isLoading" class="text-white">Registra'm</span>
                    <Loader v-else />
                </button>
            </form>

            <LoginMethods forWhat="registra't" />

            <NuxtLink href='/join' class='text-white'><svg class='w-auto h-8' xmlns="http://www.w3.org/2000/svg"
                    width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none"
                    strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M5 12l14 0" />
                    <path d="M5 12l6 6" />
                    <path d="M5 12l6 -6" />
                </svg></NuxtLink>
        </section>



    </main>
</template>

<script>
import axios from 'axios';
import Loader from '~/components/Loader.vue';
import { useStores } from '~/stores/counter';
import authManager from '@/managers/authManager';


export default {
    data() {
        return {
            store: useStores(),
            email: '',
            name: '',
            surnames: '',
            nickname: '',
            birthdate: '',
            password: '',
            passwordconfirmation: '',
            isLoading: false,
        };
    },

    methods: {
        async register() {
            this.isLoading = true;
            let userData = {
                email: this.email,
                name: this.name,
                surnames: this.surnames,
                nickname: this.nickname,
                birthdate: this.birthdate,
                password: this.password,
                passwordconfirmation: this.passwordconfirmation
            };


            const response = await authManager.register(userData);
            console.log(response);

            this.store.setUserInfo({
                id: response.data.user.id,
                name: response.data.user.name,
                surnames: response.data.user.surnames,
                email: response.data.user.email,
                token: response.data.token,
            });

            try {
                const response = await axios.post('http://localhost:8000/api/register', {
                    email: this.email,
                    name: this.name,
                    surnames: this.surnames,
                    nickname: this.nickname,
                    password: this.password,
                    birthdate: this.birthdate,
                    passwordconfirmation: this.passwordconfirmation
                });
                store.setUserInfo({
                    id: response.data.data.user.id,
                    name: response.data.data.user.name,
                    surnames: response.data.data.user.surnames,
                    email: response.data.data.user.email,
                    token: response.data.data.token,
                    birthdate: response.data.data.user.birthdate,
                    nickname: response.data.data.user.nickname
                });
                store.setLoggedIn(true);
                
                this.$router.push('/events');
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }

            this.isLoading = false;
            this.$router.push('/events');

        }
    }
}
</script>