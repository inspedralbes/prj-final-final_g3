<template>
  <NuxtPage />
</template>

<script>
import userManager from '@/managers/userManager.js';
import eventManager from './managers/eventManager.js';

export default {
  data() {
    return {
      userLocation: {},
    }
  },
  created() {
  },
  mounted() {
    this.fetchGeolocation();
    eventManager.getLocations()
  },
  methods: {
    fetchGeolocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            this.userLocation = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            };
            userManager.convertGeolocation(this.userLocation.latitude, this.userLocation.longitude);
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
  watch: {
    userLocation: {
      handler: function (val) {
        eventManager.getEventsByDistance(this.userLocation.latitude, this.userLocation.longitude, 50)
      },
      deep: true,
    },
  },
}
</script>

<style>
body {
  background-color: #212121;
  color: white;
}
</style>