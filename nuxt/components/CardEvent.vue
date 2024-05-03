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
                <IconsUsers class="size-4" /> persones
            </p>
        </div>

        <button v-if="liked" class="absolute bottom-2 right-2 p-1 rounded-lg bg-red-500 hover:bg-red-700"
            @click="toggleLike(eventId)">
            <IconsHeartFill class="size-5" />
        </button>

        <button v-if="!liked" class="absolute bottom-2 right-2 p-1 rounded-lg bg-green-500 hover:bg-green-700"
            @click="toggleLike(eventId)">
            <IconsHeart class="size-5" />
        </button>

    </div>

</template>

<script>

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
        toggleLike() {
            this.liked = !this.liked;
        }
    },
    mounted() {
        console.log(this.event);
    }
}
</script>

<style scoped></style>