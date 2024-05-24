<template>
    <div class="sticky top-0 w-[90%]">
        <div class="w-full flex flex-row text-center items-center justify-between m-4">
            <NuxtLink to="/events">
                <Logo class="size-12" />
            </NuxtLink>
            <h1 class='text-2xl font-bold text-white uppercase'>Spottunes</h1>
            <Logout v-if="store.getLoggedIn()" class="text-center flex items-center" />
        </div>
    </div>
</template>

<script>
import { useStores } from '~/stores/counter';

export default {
    data() {
        return {
            store: useStores(),
        }
    }
}
</script>

<style scoped></style>