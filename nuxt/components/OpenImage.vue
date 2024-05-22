<template>
    <section @click="closeModal" class="w-full h-screen px-4 bg-white/20 fixed top-0 left-0 flex justify-center items-center backdrop-blur-sm">
        <img :src="image" alt="Imagen del post">
    </section>
</template>

<script>
export default {
    props: {
        image: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            isOpen: false
        }
    },
    methods: {
        closeModal() {
            this.$emit('close');
        },
    }
}
</script>
