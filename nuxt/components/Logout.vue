<template>
    <button @click="logout">
        <IconsLogout class="size-6" />
    </button>
</template>

<script>
import authManager from '~/managers/authManager';
export default {

    methods: {
        async logout() {
            await authManager.logout()
                .then(() => {
                    this.$router.push('/events');
                })
        }
    }
}
</script>