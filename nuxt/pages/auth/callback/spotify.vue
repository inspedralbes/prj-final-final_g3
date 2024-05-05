<template>
    <div>
        <h1>Callback Spotify</h1>
    </div>
</template>

<script>
import comManager from '@/managers/comManager.js';

export default {
    data() {
        return {
            url: "",
            code: "",
            state: ""
        }
    },
    created() {
        this.getParams();
    },
    mounted() {
        this.fetchSpotifyToken();
    },
    methods: {
        getParams() {
            const code = this.$route.query.code;
            const state = this.$route.query.state;

            this.code = code;
            this.state = state;
        },
        async fetchSpotifyToken() {
            try {
                const response = await comManager.getSpotifyToken(this.code, this.state);
                console.log("Respuesta:", response);
            } catch (error) {
                console.error(error);
            }
        }
    }
}
</script>

<style scoped></style>