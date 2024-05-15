<template>
    <div class="text-white text-center">
        Aqui se mostraran los posts de la gente que sigues
    </div>
    <Menu />
</template>

<script>
import { useStores } from '~/stores/counter';

    export default {
        data() {
            return {
                store: useStores(),
            }
        },
        mounted(){
            if(!this.store.getLoggedIn()) return this.$router.push('/join');
        }
    }
</script>