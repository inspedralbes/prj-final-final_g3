<template>
  <main class="w-[90vw] min-h-screen mx-auto py-4 flex flex-col gap-6 relative bg-background">
    <h1 class="text-center uppercase text-2xl font-bold text-balance text-white">Els propers esdeveniments més top</h1>
    <section class="flex flex-col gap-3">
      <div v-for="evento in eventos" :key="evento.id">
        <CardEvent :event="evento" />
      </div>
    </section>
  </main>
  <Menu />
</template>

<script>
import { useStores } from '@/stores/counter.js'
import comManager from '@/managers/comManager.js';

export default {
  data() {
    return {
      store: useStores(),
      eventos: computed(() => this.store.events),
      eventosLike: [],
      location: {},
    };
  },
  methods: {
    fetchGeolocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            this.location = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            };
          comManager.convertGeolocation(this.location.latitude, this.location.longitude)
            .then(response => {
              const data = response.data.address;
              this.location.city = data.city; 
              this.location.country = data.country;
              this.location.province = data.province;
              console.log("Geolocation: ", this.location);  

            })
          },
          error => {
            console.error("Error getting geolocation: ", error);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    },


  },
  created() {
  },
  mounted() {
    comManager.getEvents(),
    this.fetchGeolocation();

  }
};
</script>