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
      <div>
        <UDivider label="Països" class="my-4" />
        <USelectMenu searchable searchable-placeholder="Busca el teu país..." option-attribute="country" color="gray"
          v-model="countrySelected" :options="locations" multiple placeholder="Selecciona els països">
        </USelectMenu>
        <div class="mt-2 flex flex-wrap">
          <UButton v-for="country in countrySelected" color="gray" :label="country.country" variant="outline"
            icon="i-heroicons-x-mark-20-solid" class="m-1 ml-0" @click="deleteCountry(country)" />
        </div>
      </div>
      <div v-if="countrySelected.length > 0">
        <UDivider label="Ciutats" class="my-4" />
        <USelectMenu v-for="country in countrySelected" searchable searchable-placeholder="Busca la teva ciutat..."
          option-attribute="city" color="gray" v-model="citySelected" :options="country.cities" multiple
          placeholder="Selecciona les ciutats" />
        <div class="mt-2 flex flex-wrap">
          <UButton v-for="city in citySelected" color="gray" :label="city.city" variant="outline"
            icon="i-heroicons-x-mark-20-solid" class="m-1 ml-0" @click="deleteCity(city)" />
        </div>
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
        <div class="flex justify-end">
          <!-- <UButton @click="resetFilters" color="red" variant="ghost" label="Restaurar filtres"></UButton> -->
          <UButton @click="filterEvents" label="Guardar filtres"></UButton>
        </div>
      </template>
    </UCard>
  </USlideover>

  <main class="w-[90vw] min-h-screen mx-auto py-4 flex flex-col gap-6 relative bg-[#212121]">
    <h1 class="text-center uppercase text-2xl font-bold text-balance text-white">Els propers esdeveniments més top</h1>
    <button @click="modals.filter = !modals.filter">Obrir filtres</button>
    <section class=" flex flex-col gap-3">
      <div v-for="evento in eventosFiltrados" :key="evento.id">
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
      // eventos: computed(() => this.store.events),
      eventosFiltrados: computed(() => this.store.events),
      eventosLike: [],
      locations: computed(() => this.store.locations),
      countrySelected: [],
      citySelected: [],
      venueSelected: [],
      modals: {
        filter: false,
      },
      distance: 50,
      userLocation: computed(() => this.store.userLocation),
    };
  },
  async mounted() {

  },
  methods: {
    deleteCountry(country) {
      this.countrySelected = this.countrySelected.filter(c => c.country !== country.country)
      this.citySelected = this.citySelected.filter(city => !country.cities.includes(city));
      this.venueSelected = this.venueSelected.filter(venue => {
        this.citySelected.find(c => c.cities.includes(venue));
      });
    },
    deleteCity(city) {
      this.citySelected = this.citySelected.filter(c => c.city !== city.city)
      this.venueSelected = this.venueSelected.filter(venue => !city.venues.includes(venue));
    },
    deleteVenue(venue) {
      this.venueSelected = this.venueSelected.filter(v => v !== venue)
    },
    filterEvents() {
      const data = {
        countries: this.countrySelected.map(c => c.country),
        cities: this.citySelected.map(c => c.city),
        venues: this.venueSelected,
        latitude: this.userLocation.latitude,
        longitude: this.userLocation.longitude,
      }
      if (data.cities.length === 0 && data.venues.length === 0) {
        data.distance = this.distance
      }

      eventManager.getFilteredEvents(data)
        .then((response) => {
          this.modals.filter = false
        })
    },
    resetFilters() {
      this.countrySelected = []
      this.citySelected = []
      this.venueSelected = []
      this.eventosFiltrados = []
      this.distance = 50;
    },

  },
  created() {
  },
  mounted() {
    if (!this.userLocation) {
      comManager.getEvents()
    }
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
    },
  }
};
</script>