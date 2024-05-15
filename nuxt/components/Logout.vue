<template>
    <button @click="logout">
        <IconsLogout class="size-6" />
    </button>
</template>

<script>
import userManager from '~/managers/userManager';
export default {

    methods: {
        async logout() {
            await userManager.logout()
                .then(() => {
                    this.$router.push('/events');
                })
        }
    }
}
</script>