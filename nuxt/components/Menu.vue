<template>
    <section class=' w-full sticky bottom-0 py-1 text-white flex justify-around items-center bg-background backdrop-blur-lg'>
            <NuxtLink to="/home" class="flex flex-col justify-center items-center" exact-active-class="text-orange-400 fill-orange-400">
                <Home class="size-7" />
                <p class='font-bold text-xs'>Inici</p>
            </NuxtLink>
            
            <NuxtLink to="/events" class="flex flex-col justify-center items-center" exact-active-class="text-orange-400 fill-orange-400">
                <Speaker class="size-7" />
                <p class='font-bold text-xs'>Events</p>
            </NuxtLink>

            <NuxtLink to="/post" class="flex flex-col justify-center items-center bg-white py-[2px] px-2 rounded-md" exact-active-class="text-orange-400 fill-orange-400">
                <Plus class="size-6 text-black" />
            </NuxtLink>

            <NuxtLink to="/chat" class="flex flex-col justify-center items-center" exact-active-class="text-orange-400 fill-orange-400">
                <Chat class="size-7" />
                <p class='font-bold text-xs'>Xat</p>
            </NuxtLink>

            <NuxtLink to="/perfil" class="flex flex-col justify-center items-center" exact-active-class="text-orange-400 fill-orange-400">
                <User class="size-7" />
                <p class='font-bold text-xs'>Perfil</p>
            </NuxtLink>
        </section>
</template>

<script>
import Home from './Icons/Home.vue'
import Speaker from './Icons/Speaker.vue'
import Plus from './Icons/Plus.vue'
import Chat from './Icons/Chat.vue'
import User from './Icons/User.vue'

export default {
    components: {
    Home,
    Speaker,
    Plus,
    Chat,
    User,
  }

}
</script>