<template>

    <div class='relative w-full h-56 rounded-xl overflow-hidden'>
        <img class='w-full h-full brightness-[.4] object-cover' :src="JSON.parse(event.images)[2]" alt="" />,
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

        <button v-if="liked" class="absolute bottom-2 right-2 p-1 rounded-lg bg-red-500 hover:bg-red-700"
            @click="toggleLike(event.id)">
            <IconsHeartFill size="20" />
        </button>

        <button v-if="!liked" class="absolute bottom-2 right-2 p-1 rounded-lg bg-green-500 hover:bg-green-700"
            @click="toggleLike(event.id)">
            <IconsHeart size="20" />
        </button>

    </div>

</template>

<script>
import axios from 'axios';
import { useStores } from '~/stores/counter';

export default {
    data() {
        return {
            liked: false
        }

    },
    props: {
        event: {
            type: Object,
            required: true
        }
    },
    methods: {
        async toggleLike(eventId) {

            const store = useStores();
            const User = store.getUserInfo();
            if (!this.liked) {
                try {
                    const response = await axios.post('http://localhost:8080/likeEvent', {
                        eventId: eventId,
                        userId: User.id
                    });
                    console.log(response)
                    this.liked = true;
                } catch (error) {
                    this.liked = false;
                    console.error('Error fetching data:', error);
                }
            } else {
                try {
                    const response = await axios.delete(`http://localhost:8080/likeEvent?eventId=${eventId}&userId=${User.id}`);
                    console.log(response)
                    this.liked = false;
                } catch (error) {
                    this.liked = true;
                    console.error('Error fetching data:', error);
                }
            }
        },
        async fetchData() {
            const store = useStores();
            const User = store.getUserInfo();
            try {
                const response = await axios.get(`http://localhost:8080/likeEvents?userId=${User.id}`);
                setEventosLike(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
    },
    mounted() {
        this.fetchData();
        console.log(this.event);
    }
}
</script>

<style scoped></style>