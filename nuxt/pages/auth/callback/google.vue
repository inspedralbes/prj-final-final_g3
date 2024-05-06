<template>
    <h1>Callback de Google</h1>
</template>

<script>
import authManager from '@/managers/authManager.js';

export default {
    data() {
        return {
            urlParams: {
                code: '',
                state: '',
                scope: '',
                authuser: '',
                hd: '',
                prompt: ''
            },
        }
    },
    created() {
        this.getParams();
    },
    mounted() {
        this.fetchGoogleToken();
    },
    methods: {
        getParams() {
            const code = this.$route.query.code;
            const state = this.$route.query.state;
            const scope = this.$route.query.state;
            const authuser = this.$route.query.authuser;
            const hd = this.$route.query.hd;
            const prompt = this.$route.query.prompt;

            this.urlParams.code = code;
            this.urlParams.state = state;
            this.urlParams.scope = scope;
            this.urlParams.authuser = authuser;
            this.urlParams.hd = hd;
            this.urlParams.prompt = prompt;
        },
        async fetchGoogleToken() {
            try {
                const response = await authManager.getGoogleToken(this.urlParams);
                console.log("Respuesta:", response);
            } catch (error) {
                console.error(error);
            }
        }
    }
}
</script>

<style scoped></style>