<template>
  <main class='min-h-screen relative'>
    <header class='w-[80%] flex justify-between absolute top-4 left-1/2 -translate-x-1/2 z-10'>
      <Link href='/events'>
      <Arrow class="size-6" />
      </Link>

      <button @click="toggleLike" 
      :class="{
        'px-4 py-1 text-black font-semibold rounded-full text-sm transition duration-300': true,
        'bg-red-400 hover:bg-red-600 text-white': liked,
        'bg-white hover:bg-green-500 hover:text-white': !liked
      }">
        {{ liked ? 'Siguiendo' : 'Seguir' }}
      </button>
    </header>

    <div class='h-[218px] relative'>
      <img src={JSON.parse(datos.images)[2]} class='w-full h-full object-cover' :alt="'Imagen del ' + datos.event" />
      <div class='absolute top-0 left-0 w-full h-full bg-gradient-to-b from-50% from-transparent to-[#212121]'></div>
    </div>
    <article class='w-[80%] mx-auto flex flex-col gap-3 mt-6'>
      <p v-if="datos.genre && datos.genre !== 'Undefined'" class="text-xs text-[#A4A4A4]">{{ datos.genre }}</p>
      <h1 class='text-2xl font-bold'>{{ datos.event }}</h1>
      <div class='flex justify-between items-center'>
        <div class='space-y-1'>
          <h2 class='font-semibold text-sm flex gap-1 items-center'>
            <MapPin class="size-5" /> {{ datos.city }}
          </h2>
          <h2 class='font-semibold text-sm flex gap-1 items-center'>
            <Music class="size-5" /> {{ datos.venue }}
          </h2>
        </div>
        <div class='space-y-1'>
          <h2 class='font-semibold text-sm flex gap-1 items-center'>
            <Calendar class="size-5" /> {{ datos.date }}
          </h2>
          <h2 class='font-semibold text-sm flex gap-1 items-center'>
            <Clock class="size-5" /> {{ datos.time }}
          </h2>
        </div>
      </div>
      <h3 class='text[#CACACA] text-sm'>2.487 personas inscritas</h3>
      <div class='w-full h-[2px] bg-[#888888]'></div>
    </article>
  </main>

  <Menu />
</template>

<script>
export default {
}
</script>