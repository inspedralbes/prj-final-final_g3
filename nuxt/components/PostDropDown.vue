<template>
  <div id="container" class="relative my-auto">
    <button class="flex items-center justify-center rounded-full focus:ring-2 focus:outline-none focus:ring-gray-400"
      @click="dropDown()">
      <IconsCircleDots />
    </button>

    <div id="dropDown" :class="{
      'absolute flex flex-col justify-center items-start gap-2 right-0 mt-2 w-max rounded-lg shadow-lg bg-primaryDark overflow-hidden modal': true,
      'isOpen': isOpen
    }">
      <Button class="flex items-center justify-start gap-2 w-full px-3 py-2 text-sm hover:bg-primary">
        <IconsPencil class="size-4" /> Editar
      </Button>
      <Button @click="deletePost" class="flex items-center justify-start gap-2 w-full px-3 py-2 text-sm hover:bg-primary">
        <IconsTrash class="size-4" /> Eliminar
      </Button>
    </div>
  </div>
</template>

<script>
import comManager from '@/managers/comManager.js';

export default {
  props: {
    postId: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      isOpen: false,
    };
  },

  methods: {

    async deletePost(){
      console.log('Deleting post', this.postId)
      await comManager.deletePost(this.postId)
    },

    dropDown() {
      this.isOpen = !this.isOpen;
    },

    closeDropDown() {
      this.isOpen = false;
    },
    // Método para manejar clics fuera del contenedor
    handleClickOutside(event) {
      const container = document.getElementById("container");
      const dropDown = document.getElementById("dropDown");

      if (
        container &&
        dropDown &&
        !container.contains(event.target) &&
        !dropDown.contains(event.target)
      ) {
        // Cerrar el desplegable si se hace clic fuera del contenedor
        this.closeDropDown();
      }
    },
  },

  mounted() {
    // Escuchar clics en el documento
    document.addEventListener("click", this.handleClickOutside);
  },

  beforeDestroy() {
    // Eliminar el listener antes de destruir el componente para evitar fugas de memoria
    document.removeEventListener("click", this.handleClickOutside);
  },

};
</script>

<style>
.modal {
  max-height: 0;
  transition: max-height 0.3s ease-in-out;
}

.isOpen {
  max-height: 200px;
}
</style>