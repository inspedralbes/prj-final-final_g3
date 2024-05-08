<template>
    <section class="text-white">
      <header class="w-[90%] h-[7vh] mx-auto flex justify-between items-center">
        <NuxtLink to="/events">Cancelar</NuxtLink>
        <button class="bg-primary rounded-full px-4 py-1 font-semibold text-sm hover:bg-primary/80 transition duration-200">Post</button>
      </header>
  
      <main class="bg-black h-[93vh] flex justify-between items-start px-[5%] pt-4">
        <div class="w-full flex justify-between items-start"> <!-- Cambio en esta línea -->
          <img class="size-14 rounded-full object-cover" src="https://i.ytimg.com/vi/LuWV8Wh00Nk/maxresdefault.jpg" alt="">
            <textarea class="w-full h-52 bg-transparent outline-none px-2 flex-grow resize-none" placeholder="Escribe aqui..."></textarea>
          <button class="rounded-full p-1 bg-[#818181]">
            <AddImage class="size-5" />
          </button>
        </div>
      </main>
    </section>
  </template>
  
  <script>
  import AddImage from '../components/Icons/AddImage.vue'
  
  export default {
    components: {
      AddImage,
    },
  }
  </script>
  