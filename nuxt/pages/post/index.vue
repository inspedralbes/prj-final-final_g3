<template>
  <section class="text-white bg-black min-h-screen">
    <header class="bg-background px-[5%] h-[7vh] flex justify-between items-center">
      <NuxtLink to="/events">Cancelar</NuxtLink>
      <button @click="post"
        class="bg-[#FF8A1E] rounded-full px-4 py-1 font-semibold text-sm hover:bg-[#FF8A1E]/80 transition duration-200">Post</button>
    </header>

    <main class=" flex justify-between items-start px-[5%] pt-4">
      <div class="w-full flex justify-between items-start h-full">
        <img class="size-14 rounded-full object-cover" src="https://i.ytimg.com/vi/LuWV8Wh00Nk/maxresdefault.jpg"
          alt="">
        <textarea ref="textarea" v-model="content" @input="autoGrow"
          class="w-full h-full bg-transparent outline-none px-2 flex-grow resize-none" autofocus
          placeholder="Escribe aqui..."></textarea>
        <input type="file" ref="fileInput" class="hidden" @change="handleFileUpload" />
        <button class="rounded-full p-1 bg-[#818181]" @click="openFileUpload">
          <IconsAddImage class="size-5" />
        </button>
      </div>
    </main>
    <img v-if="image" class="size-1/2 mt-10 p-4 border rounded object-cover mx-auto" :src="imageURL" alt="Uploaded image" />
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
      imageURL: null,
      link: null,
      store: useStores()
    }
  },

  methods: {
    async post() {
      await this.uploadImage()
      comManager.post(this.content, this.link)
      console.log('Post created')
      this.$router.push('/events')
    },

    autoGrow() {
      this.$nextTick(() => {
        this.$refs.textarea.style.height = 'auto';
        this.$refs.textarea.style.height = (this.$refs.textarea.scrollHeight) + 'px';
      });
    },

    openFileUpload() {
      this.$refs.fileInput.click();
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      this.image = file;
      this.imageURL = URL.createObjectURL(file);
    },
    
    async uploadImage(){
      let formData = new FormData();
      formData.append('img', this.image);
    
      const response = await axios.post('http://localhost:8086/uploadImage', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
    
      const link = response.data.link;
      this.link = link;
    }
  },
  mounted() {
    this.$refs.textarea.focus();
    if (!this.store.getLoggedIn()) return this.$router.push('/join');
  }

}
</script>