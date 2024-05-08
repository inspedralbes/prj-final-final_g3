<template>
  <main class="w-[90vw] min-h-screen mx-auto py-4 flex flex-col gap-6 relative bg-background">
    <h1 class="text-center uppercase text-2xl font-bold text-balance text-white">Els propers esdeveniments més top</h1>
    <section class="flex flex-col gap-3">
      <div v-for="evento in eventos" :key="evento.id">
        <!-- <NuxtLink :to="isLogged ? `/events/${evento.id}` : '/join'"
                       @click="preventDefault($event)"> -->
                       <CardEvent :event=evento></CardEvent>
        <!-- </NuxtLink> -->
      </div>
    </section>
  </main>
  <Menu />
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      eventos: [],
      eventosLike: [],
    };
  },
  methods: {
    async fetchEvents() {
      try {
        const response = await axios.get('http://localhost:8000/api/events');
        const eventos = response.data.events;
        const eventosAgrupados = {};
        eventos.forEach((evento) => {
          const key = `${evento.artist}-${evento.date}`;
          if (!eventosAgrupados[key] || evento.event.length < eventosAgrupados[key].event.length) {
            eventosAgrupados[key] = evento;
          }
          // try {
          //       const response = await axios.get(`http://localhost:8080/likeEvents?userId=${User.id}`);
          //       setEventosLike(response.data);
          // } catch (error) {
          //       console.error('Error fetching data:', error);
          // }
        });
        this.eventos = Object.values(eventosAgrupados);
        // console.log(this.eventos);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },

  },
  mounted() {
    this.fetchEvents()
  }
};
</script>