<template>
  <NuxtPage />
</template>

<script>
import comManager from '@/managers/comManager.js';

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
            comManager.convertGeolocation(this.userLocation.latitude, this.userLocation.longitude);
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