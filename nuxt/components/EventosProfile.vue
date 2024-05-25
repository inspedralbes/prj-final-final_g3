<template>
    <p class="text-center" v-if="!events">No tienes eventos disponibles.</p>
    <section v-else class='w-[90%] mx-auto flex flex-col gap-3'>
        <NuxtLink :to="`/events/${event.id}`" class="relative w-full h-48 rounded-md overflow-hidden" v-for="event in events" :key="event.id">
            <div class='relative'>
                <img :src="JSON.parse(event.images)[2]" class='w-full h-full object-cover'
                    :alt="`Foto de ${event.event}`" />
                <div
                    class='absolute top-0 left-0 w-full h-full bg-gradient-to-b from-40% from-transparent to-[#212121]'>
                </div>
            </div>
            <h1 class="absolute bottom-2 left-2 font-bold">{{ event.event }}</h1>
        </NuxtLink>

    </section>
</template>

<script>
import { useStores } from '~/stores/counter';

export default {
    data() {
        return {
            store: useStores(),
            events: [],
        }
    },
    methods: {
        async getEventos() {
            const allEvents = this.store.getEvents()
            this.events = allEvents.filter(event => event.like === true);
            console.log(this.events)
        }
    },

    mounted() {
        this.getEventos();
    }
}
</script>