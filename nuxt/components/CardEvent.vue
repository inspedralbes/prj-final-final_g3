<template>

    <div class='relative w-full h-56 rounded-xl overflow-hidden'>
        <NuxtLink :to="store.getLoggedIn() ? `/events/${event.id}` : '/join'">
            <img class='w-full h-full brightness-[.4] object-cover' :src="JSON.parse(event.images)[2]" alt="" />
            <div class='absolute bottom-2 left-2'>
                <h2 class='text-white text-xl font-semibold text-left'>{{ event.event }}</h2>
                <p class='text-white flex items-center gap-1'>
                    <IconsMapPin class="size-4" />{{ event.city }}
                </p>
                <p class='text-white flex items-center gap-1'>
                    <IconsCalendar class="size-4" />{{ event.date }}
                </p>
                <p class='text-white flex items-center gap-1'>
                    <IconsUsers class="size-4" />300 inscritos
                </p>
            </div>
        </NuxtLink>

        <button v-if="event.like" class="absolute bottom-2 right-2 p-1 rounded-lg bg-red-500 hover:bg-red-700"
            @click="toggleLike(event.id, event.like)">
            <IconsHeartFill size="20" />
        </button>

        <button v-else class="absolute bottom-2 right-2 p-1 rounded-lg bg-green-500 hover:bg-green-700"
            @click="toggleLike(event.id, event.like)">
            <IconsHeart size="20" />
        </button>

    </div>

</template>

<script>
import axios from 'axios';
import { useStores } from '~/stores/counter';

export default {
    data() {
        const store = useStores();
        return {
            store: useStores(),
            liked: false,
            events: computed(() => store.events),
        }

    },
    props: {
        event: {
            type: Object,
            required: true
        }
    },
    methods: {
        async toggleLike(eventId, like) {
            const store = useStores();
            const User = store.getUserInfo();

            if (!like) {
                try {
                    const response = await axios.post('http://localhost:8080/likeEvent', {
                        eventId: eventId,
                        userId: User.id
                    });
                    store.events[this.findIndex(eventId)].like = true;
                } catch (error) {
                    store.events[this.findIndex(eventId)].like = false;
                    console.error('Error fetching data:', error);
                }
            } else {
                try {
                    const response = await axios.delete(`http://localhost:8080/likeEvent?eventId=${eventId}&userId=${User.id}`);
                    store.events[this.findIndex(eventId)].like = false;
                } catch (error) {
                    store.events[this.findIndex(eventId)].like = true;
                    console.error('Error fetching data:', error);
                }
            }
        },
        findIndex(eventId) {
            return this.events.findIndex(event => event.id === eventId);
        }
    },
    mounted() {
        // console.log(this.findIndex(this.event.id))
        // console.log(this.events[this.findIndex(this.event.id)].like)
    }
}
</script>

<style scoped></style>