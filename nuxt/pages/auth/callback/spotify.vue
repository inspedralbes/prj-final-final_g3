<template>

</template>

<script>
import authManager from '@/managers/authManager.js';
import { useStores } from '@/stores/counter.js';

export default {
    data() {
        return {
            store: useStores(),
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
                const response = await authManager.getSpotifyToken(this.code, this.state);
                this.store.setInfoOnRegister(response);
                this.$router.push('/completar');
            } catch (error) {
                console.error(error);
                this.$router.push('/join');
            }
        }
    }
}
</script>

<style scoped></style>