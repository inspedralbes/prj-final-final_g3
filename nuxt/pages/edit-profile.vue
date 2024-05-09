<template>
  <main class="w-screen h-screen bg-background">
    <section class="w-[80vw] h-screen mx-auto flex flex-col gap-10 justify-center">
      <h1 class="text-4xl font-semibold">Edita el teu perfil</h1>

      <form class="flex flex-col gap-6" @submit.prevent="update">
        <input
          class="bg-transparent border-b border-gray-400 outline-none"
          type="text"
          autofocus
          placeholder="Name"
          v-model="name"
        />
        <input
          class="bg-transparent border-b border-gray-400 outline-none"
          type="text"
          placeholder="Nickname"
          v-model="nickname"
        />
        <input
          class="bg-transparent border-b border-gray-400 outline-none"
          type="text"
          placeholder="Surnames"
          v-model="surnames"
        />
        <input
          class="bg-transparent border-b border-gray-400 outline-none"
          type="text"
          placeholder="Email"
          v-model="email"
        />
        <input
          class="bg-transparent border-b border-gray-400 outline-none"
          type="date"
          placeholder="Birthdate"
          v-model="birthdate"
        />

        <button class="flex justify-center py-3 font-bold rounded-full bg-gradient-to-r from-orange-600 to-yellow-600" type="submit">
          {{ !isLoading ? "Actualitza" : "Cargando..." }}
        </button>
      </form>

      <router-link to="/perfil">
        <svg class="w-auto h-8" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M5 12l14 0" />
          <path d="M5 12l6 6" />
          <path d="M5 12l6 -6" />
        </svg>
      </router-link>
    </section>
  </main>
</template>

<script>
import axios from 'axios';
import { useStores } from '@/stores/counter';

export default {
  data() {
    return {
      name: '',
      nickname: '',
      surnames: '',
      email: '',
      birthdate: '',
      Token: '',
      isLoading: false
    };
  },
  mounted() {
    const stores = useStores();
    const userInfo = stores.getUserInfo();
    this.name = userInfo.name;
    this.nickname = userInfo.nickname;
    this.surnames = userInfo.surnames;
    this.email = userInfo.email;
    this.birthdate = userInfo.birthdate;
  },
  methods: {
    async update() {
      this.isLoading = true;
      const stores = useStores();
        this.Token = stores.getToken();
      try {
        const response = await axios.put('http://localhost:8000/api/updateInfo', {
          name: this.name,
          nickname: this.nickname,
          surnames: this.surnames,
          email: this.email,
          birthdate: this.birthdate
        }, {
          headers: {
            'Authorization': `Bearer ${this.Token}`
          }
        });
        const stores = useStores();
        stores.setUserInfo(response.data);
        this.$router.push('/perfil');
      } catch (error) {
        console.error(error);
      }
      this.isLoading = false;
    }
  }
}
</script>

<style scoped>
/* Estilos específicos si es necesario */
</style>