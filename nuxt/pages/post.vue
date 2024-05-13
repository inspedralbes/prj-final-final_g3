<template>
  <section class="text-white">
    <header class="w-[90%] h-[7vh] mx-auto flex justify-between items-center">
      <NuxtLink to="/events">Cancelar</NuxtLink>
      <button @click="post"
        class="bg-primary rounded-full px-4 py-1 font-semibold text-sm hover:bg-primary/80 transition duration-200">Post</button>
    </header>

    <main class="bg-black h-[93vh] flex justify-between items-start px-[5%] pt-4">
      <div class="w-full flex justify-between items-start h-full">
        <img class="size-14 rounded-full object-cover" src="https://i.ytimg.com/vi/LuWV8Wh00Nk/maxresdefault.jpg"
          alt="">
        <textarea ref="textarea" v-model="content" class="w-full h-full bg-transparent outline-none px-2 flex-grow resize-none" autofocus
          placeholder="Escribe aqui..."></textarea>
        <button class="rounded-full p-1 bg-[#818181]">
          <IconsAddImage class="size-5" />
        </button>
      </div>
    </main>
  </section>
</template>

<script>
import axios from 'axios'
import { useStores } from '~/stores/counter';
import comManager from '@/managers/comManager.js';

export default {

  data() {
    return {
      content: "",
      image: null,
      store: useStores()
    }
  },

  methods: {
    async post() {
      comManager.post(this.content)
      console.log('Post created')
      this.$router.push('/events')
    },
  },
  mounted(){
    this.$refs.textarea.focus();
    if(!this.store.getLoggedIn()) return this.$router.push('/join');
  }

}
</script>