<template>
    <section class="w-[90vw] min-h-screen mx-auto text-white">
        <header class="h-[10vh] flex justify-between items-center">
            <h1 class="text-4xl">Mensajes</h1>
            <div class="flex justify-center items-center gap-2">
                <button>
                    <NuxtLink to="/add-chat">
                        <AddChat class="size-6" />
                    </NuxtLink>
                </button>
                <button>
                    <Search class="size-6" />
                </button>
            </div>
        </header>

        <NuxtLink to="/chat">
            <main class="flex justify-between items-center gap-2">
                <img class="size-16 rounded-full object-cover"
                    src="https://thumbs.web.sapo.io/?W=800&H=0&delay_optim=1&epic=NDFjSdwqImaET1gQCMUsNp5Qavn4PlLFQyCWKmycNTnIrB2+LwIWzyTNyDw1vKtb1IpZFcVQrYXXHk79sdT61tq23+ULbUSFnEiSEsC5SgPiLHE="
                    alt="">
                <div class="flex flex-col justify-center items-start gap-1 max-w-64">
                    <h2 class="font-bold">User name</h2>
                    <p class="text-sm">Ultimo mensaje o mensaje no leido que le ha enviado otro usuario a este.
                    </p>
                </div>
                <div class="flex flex-col justify-center items-center gap-2">
                    <p class="text-xs text-[#ADADAD]">Hace 1h</p>
                    <p class="text-sm rounded-full bg-[#FF8A1E] size-6 flex justify-center items-center">2</p>
                </div>
            </main>
        </NuxtLink>
        <div class="bg-[#D9D9D9]/20 w-full h-[1px] rounded-full my-4"></div>
    </section>
    <Menu />
</template>

<script>
import AddChat from '~/components/Icons/AddChat.vue'
import Search from '~/components/Icons/Search.vue'
import { useStores } from '~/stores/counter'

export default {
    data() {
        return {
            store: useStores(),
        }
    },
    components: {
        AddChat,
        Search,

    },
    mounted() {
        if (!this.store.getLoggedIn()) return this.$router.push('/join');
    }
}
</script>
