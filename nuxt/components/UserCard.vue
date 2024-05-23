<template>
    <div>
        {{ user }}
    </div>
</template>

<script>
export default {
    props: {
        user: {
            type: Object,
            required: true
        }
    },
}
</script>

<style scoped></style>