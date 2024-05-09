<template>
    <div id="language-container" class="relative my-auto">
        <button
            class="flex items-center justify-center rounded-full focus:ring-2 focus:outline-none focus:ring-gray-400"
            @click="dropDown()">
            <IconsCircleDots />
        </button>

        <div id="dropdownLanguage"
            :class="{ 'absolute flex flex-col justify-center items-start gap-2 right-0 mt-2 w-max rounded-lg shadow-lg bg-slate-400/50 overflow-hidden modal': true, 'isOpen': isOpen }">

            <Button class="flex items-center justify-start gap-2 w-full px-3 py-2 text-sm hover:bg-primary">
                <IconsPencil class="size-4" /> Editar
            </Button>
            <Button class="flex items-center justify-start gap-2 w-full px-3 py-2 text-sm hover:bg-primary">
                <IconsTrash class="size-4" /> Eliminar
            </Button>
        </div>

    </div>
</template>

<script>
export default {
    
    data() {
        return {
            isOpen: false
        }
    },

    methods: {
        dropDown() {
            this.isOpen = !this.isOpen
        },

        closeDropDown() {
            this.isOpen = false
        },

        
    },
}
</script>

<style>
.modal {
    max-height: 0;
    transition: max-height .3s ease-in-out;
}

.isOpen {
    max-height: 200px;
}
</style>