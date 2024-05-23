<template>
  <main class="w-screen h-screen bg-[#212121]">
    <section class="w-[80vw] h-screen mx-auto flex flex-col gap-10 justify-center">
      <h1 class="text-4xl font-semibold">Edita el teu perfil</h1>

      <form class="flex flex-col gap-6 " @submit.prevent="update">
        <label for="avatarInput" class="relative flex flex-row items-center hover:cursor-pointer">
          <input id="avatarInput" type="file" class="hidden" @change="handleAvatarChange" accept="image/*" />
          <img class="size-24 rounded-full object-cover " :src="avatar || '/img/standard_pfp.jpg'" alt="" />
          <p class="m-4">Canvia la imatge de perfil</p>
        </label>
        <input class="bg-transparent border-b border-gray-400 outline-none" type="text" placeholder="Nickname"
          v-model="nickname" />
        <input class="bg-transparent border-b border-gray-400 outline-none" type="text" autofocus placeholder="Nom"
          v-model="name" />
        <input class="bg-transparent border-b border-gray-400 outline-none" type="text" placeholder="Cognoms"
          v-model="surnames" />
        <input class="bg-transparent border-b border-gray-400 outline-none" type="text" placeholder="Email"
          v-model="email" />
        <input class="bg-transparent border-b border-gray-400 outline-none" type="date" placeholder="Data de naixement"
          v-model="birthdate" />

        <button class="flex justify-center py-3 font-bold rounded-full bg-gradient-to-r from-orange-600 to-yellow-600"
          type="submit">
          <Loader v-if="isLoading" />
          <span v-else>Actualitza el teu perfil</span>
        </button>
      </form>

      <router-link to="/perfil">
        <svg class="w-auto h-8" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
          stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
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
import { useStores } from '@/stores/counter';
import userManager from '@/managers/userManager.js';

export default {
  data() {
    return {
      store: useStores(),
      name: '',
      nickname: '',
      surnames: '',
      email: '',
      birthdate: '',
      avatar: '',
      Token: '',
      isLoading: false
    };
  },
  mounted() {
    if (!this.store.getLoggedIn()) return this.$router.push('/join');

    const userInfo = this.store.getUserInfo();
    this.name = userInfo.name;
    this.nickname = userInfo.nickname;
    this.surnames = userInfo.surnames;
    this.avatar = userInfo.avatar;
    this.email = userInfo.email;
    this.birthdate = userInfo.birthdate;
  },
  methods: {
    async update() {
      this.isLoading = true;
      this.Token = this.store.getToken();
      const user = {
        name: this.name,
        nickname: this.nickname,
        surnames: this.surnames,
        email: this.email,
        avatar: this.avatar,
        birthdate: this.birthdate
      }

      const response = await userManager.updateUser(user, this.Token);
      if (response.status === 200) {
        response.data.token = this.Token;
        this.store.setUserInfo(response.data);
        this.$router.push('/perfil');
        this.isLoading = false;
      }
    },
    handleAvatarChange(e) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        this.avatar = e.target.result;
      }
      reader.readAsDataURL(file);
    }
  }
}
</script>

<style scoped>
/* Estilos específicos si es necesario */
</style>