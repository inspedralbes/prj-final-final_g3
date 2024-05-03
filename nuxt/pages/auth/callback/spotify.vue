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
        console.log(comManager.getSpotifyToken(this.code, this.state));
    },
    methods: {
        getParams() {
            const code = this.$route.query.code;
            const state = this.$route.query.state;

            this.code = code;
            this.state = state;
        },
    }
}
</script>

<style scoped></style>