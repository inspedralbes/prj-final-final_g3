<template>
  <main class="min-h-screen relative">
    <header class='w-[80%] flex justify-between absolute top-4 left-1/2 -translate-x-1/2 z-10'>
      <NuxtLink to='/events'>
        <IconsLeftArrow class="size- bg-black rounded-full bg-opacity-60" />
      </NuxtLink>

      <button @click="toggleLike" :class="{
        'px-4 py-1 text-black font-semibold rounded-full text-sm transition duration-300': true,
        'bg-red-400 hover:bg-red-600 text-white': liked,
        'bg-white hover:bg-green-500 hover:text-white': !liked
      }">
        {{ liked ? 'Siguiendo' : 'Seguir' }}
      </button>
    </header>
    <div class='h-[218px] relative'>
      <img v-if="eventImage" :src="eventImage" class='w-full h-full object-cover' :alt="`Foto de ${event.event}`" />
      <div class='absolute top-0 left-0 w-full h-full bg-gradient-to-b from-50% from-transparent to-[#212121]'></div>
    </div>

    <article class='w-[80%] mx-auto flex flex-col gap-3 mt-6'>
      <p v-if="event.genre && event.genre !== 'Undefined'" class="text-xs text-[#A4A4A4]">{{ event.genre }}</p>
      <h1 class='text-2xl font-bold'>{{ event.event }}</h1>
      <div class='flex justify-between items-center'>
        <div class='space-y-1'>
          <h2 class='font-semibold text-sm flex gap-1 items-center'>
            <MapPin class="size-5" /> {{ event.city }}
          </h2>
          <h2 class='font-semibold text-sm flex gap-1 items-center'>
            <Music class="size-5" /> {{ event.venue }}
          </h2>
        </div>
        <div class='space-y-1'>
          <h2 class='font-semibold text-sm flex gap-1 items-center'>
            <Calendar class="size-5" /> {{ event.date }}
          </h2>
          <h2 class='font-semibold text-sm flex gap-1 items-center'>
            <Clock class="size-5" /> {{ event.time }}
          </h2>
        </div>
      </div>
      <!-- <h3 class='text[#CACACA] text-sm'>2.487 personas inscritas</h3> -->
      <div class='w-full h-[2px] bg-[#888888]'></div>
    </article>
  </main>
</template>

<script>
import { useStores } from '@/stores/counter.js';

export default {
  data() {
    return {
      store: useStores(),
      liked: false,
      eventID: parseInt(this.$route.params.id),
      event: {},
      eventImage: ''
    }
  },
  created() {
    this.getEventById();
  },
  mounted() {

  },
  methods: {
    getEventById() {
      this.event = this.store.events.find(event => event.id === this.eventID);
    },
    toggleLike() {
      this.liked = !this.liked;
    }
  },
  computed: {

  },
  watch: {
    event() {
      const imagesJSON = JSON.parse(this.event.images);
      this.eventImage = imagesJSON[2];
    }
  }
}
</script>