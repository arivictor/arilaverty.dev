<template>
    <v-container>
        <v-row
                align="center"
                justify="center">
            <v-col
                    cols="12"
                    sm="12"
                    md="6"
                    lg="6">
                <v-alert
                        type="error"
                        text
                        prominent
                        v-if="error && !loading">
                    Sorry, we can't find that post anymore.
                </v-alert>
                <post-card
                        :data="post"
                        v-else-if="!loading && post !== null"
                ></post-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import PostCard from "../components/PostCard/PostCard";
    import * as fb from "../firebase";

    export default {
        name: "ViewPost",

        components: {PostCard},

        created() {
            this.getPost();
        },

        data: () => ({
            error: false,
            loading: false,
            post: null
        }),

        methods: {
            async getPost() {
                this.loading = true;

                const postID = this.$route.params.id
                const postRef = fb.postsCollection.doc(postID);
                const doc = await postRef.get();

                if (doc.exists) {
                    this.post = doc.data();
                } else {
                    this.error = true;
                }
                this.loading = false;
            }
        }
    }
</script>

<style scoped>

</style>