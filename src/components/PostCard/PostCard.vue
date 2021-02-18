<template>
    <v-card
            elevation="1"
            class="mb-4 pa-5 rounded-lg">
        <v-list>
            <v-skeleton-loader
                    type="list-item-avatar-two-line"
                    v-if="userData === null"
            ></v-skeleton-loader>
            <v-list-item v-else>
                <v-list-item-avatar
                        class="elevation-1 white--text"
                        :color="userData.picture ? 'white':'primary'"
                        size="50"
                >
                    <v-img
                            :src="userData.picture"
                            v-if="userData && userData.picture"
                    ></v-img>
                    <span v-else>{{ userData.name.slice(0,1) }}</span>
                </v-list-item-avatar>
                <v-list-item-content>
                    <v-list-item-title
                            v-text="userData.name"
                    ></v-list-item-title>
                    <v-list-item-subtitle
                            v-text="formatDate(data.createdTime)"
                    ></v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                    <post-card-menu :data="data"></post-card-menu>
                </v-list-item-action>
            </v-list-item>
        </v-list>

        <v-carousel
                v-model="imageCarousel"
                v-if="data.images && data.images.length"
                :height="imageDefaultHeight"
                hide-delimiters
                :show-arrows="data.images.length > 1">
            <v-carousel-item
                    v-for="(image, i) in data.images"
                    :key="i"
            >
                <v-img
                        class="rounded-lg"
                        :src="image"
                        :max-height="imageDefaultHeight"
                >
                </v-img>
            </v-carousel-item>
        </v-carousel>

        <v-card-text
                v-html="parseURLs(hashBold(data.text))"
                v-if="data.text"
        >
        </v-card-text>
        <v-card-actions>
            <v-btn
                    icon
                    @click="likePost"
                    large>
                <v-badge
                        :content="data.likes"
                        :value="data.likes"
                        overlap
                        left>
                    <v-icon
                            v-text="'mdi-heart-outline'"
                    ></v-icon>
                </v-badge>
            </v-btn>
            <v-btn
                    @click.stop="toggleComments = !toggleComments"
                    icon
                    large>
                <v-icon
                        v-text="'mdi-comment'"
                        v-if="toggleComments"
                ></v-icon>
                <v-icon
                        v-text="'mdi-comment-outline'"
                        v-else
                ></v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <post-share-dialog :data="data.id"></post-share-dialog>
        </v-card-actions>
        <v-card-text v-if="toggleComments">
            <post-comments :data="comments"></post-comments>
            <v-form @submit.prevent="addComment">
                <v-text-field
                        :disabled="!isSignedIn"
                        append-icon="mdi-comment-outline"
                        clearable
                        outlined
                        placeholder="Write a comment..."
                        v-model="comment"
                        @click:append="addComment"
                ></v-text-field>
            </v-form>
        </v-card-text>
    </v-card>
</template>

<script>
    const linkifyHtml = require('linkifyjs/html');
    import * as fb from "../../firebase";
    import PostCardMenu from "./PostCardMenu";
    import PostComments from "./PostComments";
    import {mapGetters} from "vuex";
    import PostShareDialog from "./PostShareDialog";

    const dayjs = require('dayjs')
    const calendar = require('dayjs/plugin/calendar')
    dayjs.extend(calendar)

    export default {
        name: "PostCard",

        components: {
            PostShareDialog,
            PostComments,
            PostCardMenu,
        },

        computed: {
            ...mapGetters(['user', 'language']),
            isSignedIn() {
                return this.user !== null;
            }

        },

        created() {
            this.getUser(this.data.userID);
        },

        data: () => ({
            comment: "",
            userData: null,
            imageDefaultHeight: '350px',
            imageCarousel: "",
            toggleComments: false,
            comments: [],
        }),

        methods: {
            hashBold: function (value) {
                if (!value) return "";
                value = value.toString();
                let hashReg = /#\w+/gm;
                value = value.replace(hashReg, match => `<a style="text-decoration: none!important;" href="/feed?tag=${match.replace("#", "").toLowerCase()}">${match}</a>`);
                return value;
            },
            parseURLs(value) {
                return linkifyHtml(value, {
                    defaultProtocol: 'https'
                });
            },
            async addComment() {
                if (!fb.auth.currentUser.uid) {
                    return;
                }
                const comment = {
                    postID: this.data.id,
                    createdTime: new Date(),
                    userID: fb.auth.currentUser.uid,
                    text: this.comment,
                }
                await fb.commentsCollection.doc().set(comment)
                    .then(() => {
                        this.comment = "";
                    }).catch(error => {
                        console.log(error);
                    })

            },
            formatDate(value) {
                return dayjs(value.toDate()).calendar();
            },
            async getUser(userID) {
                const usersRef = fb.db.collection('users').doc(userID);
                const doc = await usersRef.get();
                if (!doc.exists) {
                    this.userData = {name: 'Not Found'};
                } else {
                    this.userData = doc.data();
                }
            },
            async likePost() {
                const userId = fb.auth.currentUser.uid;
                if (!userId) {
                    return;
                }
                const docId = `${userId}_${this.data.id}`;

                const docRef = fb.likesCollection.doc(docId);
                const doc = await docRef.get();
                if (doc.exists) {
                    await docRef.delete();
                    await fb.postsCollection.doc(this.data.id).update({
                        likes: this.data.likes - 1,
                    })
                } else {
                    // create post
                    await fb.likesCollection.doc(docId).set({
                        postId: this.data.id,
                        userId: userId,
                    })

                    // update post likes count
                    await fb.postsCollection.doc(this.data.id).update({
                        likes: this.data.likes + 1,
                    })
                }
            }
        },

        props: {
            data: Object,
        },

        watch: {
            toggleComments() {
                if (this.toggleComments) {
                    fb.commentsCollection
                        .orderBy("createdTime", "asc")
                        .where('postID', '==', this.data.id)
                        .onSnapshot(snapshot => {
                            let commentsArray = [];
                            snapshot.forEach(doc => {
                                let comment = doc.data();
                                comment.id = doc.id;
                                commentsArray.push(comment);
                            })
                            this.comments = commentsArray;
                        })
                } else {
                    this.comments = [];
                }
            }
        }
    }
</script>

<style scoped>
    .no-underline {
        text-decoration: none !important;
    }
</style>