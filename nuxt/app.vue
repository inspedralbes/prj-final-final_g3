<template>
  <NuxtPage />
</template>

<script>
import userManager from '@/managers/userManager.js';

export default {
  data() {
    return {

    }
  },
  created() {
  },
  mounted() {
    this.fetchGeolocation()
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
  }
}
</script>

<style>
body {
  background-color: #212121;
  color: white;
}
</style>