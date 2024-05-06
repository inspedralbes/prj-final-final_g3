<template>
  <main class="w-[90vw] min-h-screen mx-auto py-4 flex flex-col gap-6 relative bg-background">
    <h1 class="text-center uppercase text-2xl font-bold text-balance">Els propers esdeveniments més top</h1>
    <section class="flex flex-col gap-3">
      <div v-for="evento in eventos" :key="evento.id">
        <!-- <NuxtLink :to="isLogged ? `/events/${evento.id}` : '/join'"
                       @click="preventDefault($event)"> -->
        <CardEvent :event=evento></CardEvent>
        <!-- </NuxtLink> -->
      </div>
    </section>
  </main>
  <!-- <Menu /> -->
</template>

<script>
import axios from 'axios';
import { useAppStore } from '@/stores/counter.js'
import comManager from '@/managers/comManager.js';

export default {
  data() {
    return {
      store: useAppStore(),
      eventos: computed(() => this.store.events),
      eventosLike: [],
    };
  },
  methods: {

  },
  created() {
    comManager.getEvents()
  },
  mounted() {
    this.fetchEvents()
  }
};
</script>