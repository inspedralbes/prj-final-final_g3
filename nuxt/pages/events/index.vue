<template>
  <USlideover v-model="modals.filter" side="left">
    <UCard class="flex flex-col flex-1"
      :ui="{ body: { base: 'flex-1' }, ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
            Filtres
          </h3>
          <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
            @click="modals.filter = !modals.filter" />
        </div>
      </template>
      <UDivider :label="`Distancia (${distance}km)`" class="mb-4" />
      <URange color="orange" :max="1500" v-model="distance"></URange>
      <UDivider label="Ciutats" class="my-4" />
      <USelectMenu searchable searchable-placeholder="Busca la teva ciutat..." option-attribute="city" color="gray"
        v-model="citySelected" :options="locations" multiple placeholder="Selecciona les ciutats">
      </USelectMenu>
      <div class="mt-2 flex flex-wrap">
        <UButton v-for="city in citySelected" color="gray" :label="city.city" variant="outline"
          icon="i-heroicons-x-mark-20-solid" class="m-1 ml-0" @click="deleteCity(city)" />
      </div>
      <div v-if="citySelected.length > 0">
        <UDivider label="Espais" class="my-4" />
        <USelectMenu searchable searchable-placeholder="Busca el teu espai..." color="gray" v-model="venueSelected"
          :options="getVenues" multiple placeholder="Selecciona els espais" />
        <div class="mt-2 flex flex-wrap">
          <UButton v-for="venue in venueSelected" color="gray" :label="venue" variant="outline"
            icon="i-heroicons-x-mark-20-solid" class="m-1 ml-0" @click="deleteVenue(venue)" />
        </div>
      </div>
      <template #footer>
        <div class="flex justify-between">
          <UButton @click="resetFilters" color="red" variant="ghost" label="Restaurar filtres"></UButton>
          <UButton @click="filterEvents" label="Guardar filtres"></UButton>
        </div>
      </template>
    </UCard>
  </USlideover>

  <main class="w-[90vw] min-h-screen mx-auto py-4 flex flex-col gap-6 relative bg-[#212121]">
    <h1 class="text-center uppercase text-2xl font-bold text-balance text-white">Els propers esdeveniments més top</h1>
    <button @click="modals.filter = !modals.filter">Obrir filtres</button>
    <section class=" flex flex-col gap-3">
      <div v-for="evento in eventosFiltrados.length > 0 ? eventosFiltrados : eventos" :key="evento.id">
        <CardEvent :event="evento" />
      </div>
    </section>
  </main>
  <Menu />
</template>

<script>
import { useStores } from '@/stores/counter.js'
import comManager from '@/managers/comManager.js';
import eventManager from '@/managers/eventManager.js';

export default {
  data() {
    return {
      store: useStores(),
      eventos: computed(() => this.store.events),
      eventosFiltrados: [],
      eventosLike: [],
      locations: computed(() => this.store.locations),
      citySelected: [],
      venueSelected: [],
      modals: {
        filter: false,
      },
      distance: 1500,
      userLocation: {},
    };
  },
  methods: {
    deleteCity(city) {
      this.citySelected = this.citySelected.filter(c => c.city !== city.city)
      this.venueSelected = this.venueSelected.filter(venue => !city.venues.includes(venue));
    },
    deleteVenue(venue) {
      this.venueSelected = this.venueSelected.filter(v => v !== venue)
    },
    filterEvents() {
      comManager.getFilteredEvents(this.citySelected, this.venueSelected)
        .then((response) => {
          this.eventosFiltrados = response;
          this.modals.filter = false
        })
    },
    resetFilters() {
      this.citySelected = []
      this.venueSelected = []
      this.eventosFiltrados = []
    },
    fetchGeolocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            this.userLocation = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            };
            console.log(this.userLocation)
            comManager.convertGeolocation(this.userLocation.latitude, this.userLocation.longitude)
              .then(response => {
                this.userLocation.city = response.city;
                this.userLocation.country = response.country;
                this.userLocation.province = response.province;
                console.log(this.userLocation)
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
    this.fetchGeolocation();
    comManager.getEvents();
    eventManager.getLocations()
  },
  computed: {
    getVenues() {
      let venues = []
      this.citySelected.forEach(city => {
        venues.push(...city.venues)
      });
      return venues
    }
  },
  watch: {
    citySelected() {
      if (this.citySelected.length === 0) {
        this.venueSelected = []
      }
    }
  }
};
</script>