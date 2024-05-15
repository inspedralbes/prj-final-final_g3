<template>
  <main class="min-h-screen relative">
    <header class='w-[80%] flex justify-between absolute top-4 left-1/2 -translate-x-1/2 z-10'>
      <NuxtLink to='/events'>
        <IconsLeftArrow class="size- bg-black rounded-full bg-opacity-60" />
      </NuxtLink>

      <button @click="toggleLike" :class="{
        'px-4 py-1 text-black font-semibold rounded-full text-sm transition duration-300': true,
        'bg-red-400 hover:bg-red-600 text-white': event.like,
        'bg-white hover:bg-green-500 hover:text-white': !event.like
      }">
        {{ event.like ? 'Siguiendo' : 'Seguir' }}
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
            <IconsMapPin class="size-5" /> {{ event.city }}
          </h2>
          <h2 class='font-semibold text-sm flex gap-1 items-center'>
            <IconsMusic class="size-5" /> {{ event.venue }}
          </h2>
        </div>
        <div class='space-y-1'>
          <h2 class='font-semibold text-sm flex gap-1 items-center'>
            <IconsCalendar class="size-5" /> {{ event.date }}
          </h2>
          <h2 class='font-semibold text-sm flex gap-1 items-center'>
            <IconsClock class="size-5" /> {{ event.time }}
          </h2>
        </div>
      </div>
      <h3 class='text[#CACACA] text-sm'>{{ counterFollowers }} personas inscritas</h3>
      <div class='w-full h-[2px] bg-[#888888]'></div>
      <UserCardEvent/>
    </article>
  </main>
</template>

<script>
import { useStores } from '@/stores/counter.js';
import comManager from '@/managers/comManager.js';

export default {
  data() {
    return {
      store: useStores(),
      eventID: parseInt(this.$route.params.id),
      event: {},
      eventImage: '',
      counterFollowers: 0,
      page: 0,
      followers: [],

    }
  },
  created() {
    this.getEventById();
  },
  mounted() {
    if(!this.store.getLoggedIn()) return this.$router.push('/join');
    this.getEventCounterFollowers();
    this.getFollowers();
  },
  methods: {
    getEventById() {
      this.event = this.store.events.find(event => event.id === this.eventID);
    },
    async toggleLike() {
      let response;
      if (!this.event.like) {
        response = await comManager.likeAnEvent(this.event.id)
        if (response.status === 200) {
          this.event.like = true
          this.counterFollowers += 1;
          this.store.events[this.findIndex(this.event.id)].like = true;
        }
      } else {
        response = await comManager.unlikeAnEvent(this.event.id)
        if (response.status === 200) {
          this.event.like = false
          this.counterFollowers -= 1;
          this.store.events[this.findIndex(this.event.id)].like = false;
        }
      }
    },
    findIndex(eventId) {
      return this.store.getEvents().findIndex(event => event.id === eventId);
    },
    async getEventCounterFollowers() {
      const response = await comManager.getEventCounterFollowers(this.event.id);
      this.counterFollowers = response.data.eventFollowers;
    },
    async getFollowers(){
      const response = await comManager.getEventFollowers(this.event.id,this.page);
      const followersMongo = response.data;

      if (response.length == 10){
        page++;
      }

      followersMongo.forEach(follower => {
        comManager.getUserById(follower.userId,this.store.getToken()).then(response => {
          this.followers.push(response.data);
          console.log(this.followers);
        });
      });
      
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