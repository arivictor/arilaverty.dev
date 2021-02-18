<template>
    <v-container>
        <v-row align="center" justify="center">
            <v-col cols="12" sm="12" md="6" lg="6">
                <new-post-dialog v-if="user !== null"></new-post-dialog>
                <post-card v-for="post in posts" :key="post.id" :data="post"></post-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>

    import PostCard from "../components/PostCard/PostCard";
    import NewPostDialog from "../components/NewPostCard/NewPostDialog";
    import {mapGetters} from "vuex";
    import * as fb from "../firebase";

    export default {
        name: 'Home',

        components: {
            NewPostDialog,
            PostCard,
        },

        computed: {
            ...mapGetters(['user'])
        },

        data: () => ({
            posts: []
        }),

        mounted() {
            if (this.$route.query.tag) {
                console.log("here i am")
                fb.postsCollection.where("tags", "array-contains", this.$route.query.tag).orderBy('createdTime', 'desc').onSnapshot(snapshot => {
                    let postsArray = []
                    snapshot.forEach(doc => {
                        let post = doc.data()
                        post.id = doc.id
                        postsArray.push(post)
                    })
                    this.posts = postsArray;
                })
            } else {
                fb.postsCollection.orderBy('createdTime', 'desc').onSnapshot(snapshot => {
                    let postsArray = []
                    snapshot.forEach(doc => {
                        let post = doc.data()
                        post.id = doc.id
                        postsArray.push(post)
                    })
                    this.posts = postsArray;
                })
            }
        }

    }
</script>
