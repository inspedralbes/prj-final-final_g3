<template>
    <div class="w-full h-[50vh]">
        <LMap ref="map" :zoom="zoom" :max-zoom="18" :center="[47.21322, -1.559482]" @ready="mapInitialized">
            <LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
                layer-type="base" name="OpenStreetMap" />
        </LMap>
    </div>
</template>

<script setup>
import { ref } from 'vue'
const zoom = ref(6)

const map = ref(null)

// When the map is ready
const mapInitialized = () => {
    console.log('Map is ready')
    console.log(map.value.maxZoom)
}
</script>