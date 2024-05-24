<template>
    <section class='flex justify-center text-white'>
        <p v-if="!eventos">No tens esdeveniments disponibles.</p>
        <article v-else>

        </article>
    </section>
</template>

<script>
import { useStores } from '~/stores/counter';

export default {
    data() {
        return {
            store: useStores(),
            eventos: [],
        }
    },
    methods: {
        async getEventos() {
            const allEvents = this.store.getEvents()
            this.eventos = allEvents.filter(event => event.like === true);
            console.log(this.eventos)
        }
    },

    mounted() {
        this.getEventos();
    }
}
</script>