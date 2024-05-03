<template>

    <div className='relative w-full h-56 rounded-xl overflow-hidden'>
        <img className='w-full h-full brightness-[.4] object-cover' :src="JSON.parse(event.images)[2]" alt="" />,
        <div className='absolute bottom-2 left-2'>
            <h2 className='text-white text-xl font-semibold text-left'>{{ event.event }}</h2>
            <p className='text-white flex items-center gap-1'>
                <IconsMapPin size="18" />{{ event.city }}
            </p>
            <p className='text-white flex items-center gap-1'>
                <IconsCalendar size="18" />{{ event.date }}
            </p>
            <p className='text-white flex items-center gap-1'>
                <IconsUsers size="18" /> persones
            </p>
            <p className='text-white flex items-center gap-1'> likes</p>
        </div>

        <button v-if="liked" className="absolute bottom-2 right-2 p-1 rounded-lg bg-red-500 hover:bg-red-700"
            @click="toggleLike(eventId)">
            <IconsHeartFill size="20" />
        </button>

        <button v-if="!liked" className="absolute bottom-2 right-2 p-1 rounded-lg bg-green-500 hover:bg-green-700"
            @click="toggleLike(eventId)">
            <IconsHeart size="20" />
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