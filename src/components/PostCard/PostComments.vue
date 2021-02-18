<template>
    <v-card-text>
        <v-divider class="mb-4"></v-divider>

        <post-comment :key="comment.id" v-for="comment in data" :data="comment"></post-comment>

    </v-card-text>
</template>

<script>

    import PostComment from "./PostComment";

    export default {
        name: "PostComments",

        components: {PostComment},

        data: () => ({
        }),

        props: {
            data: Array,
        }
    }
</script>

<style scoped>

</style>