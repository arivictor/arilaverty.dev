<template>
    <div>
        <v-dialog
                v-model="dialog"
                width="500"
        >
            <template v-slot:activator="{ on, attrs }">
                <v-card elevation="1" class="mb-4 pa-5 rounded-lg">
                    <v-card-subtitle>Create a Post</v-card-subtitle>
                    <v-card-text>
                        <v-row dense justify="center">
                            <v-col class="grow">
                                <v-text-field
                                        readonly
                                        v-on="on"
                                        v-bind="attrs"
                                        append-icon="mdi-post-outline"
                                        clearable
                                        outlined
                                        placeholder="What's on your mind..."
                                ></v-text-field>
                            </v-col>
                        </v-row>

                    </v-card-text>
                </v-card>
            </template>

            <v-card class="rounded-lg pa-5" :disabled="loading">
                <v-card-title>
                    Create Post
                </v-card-title>

                <v-card-text>
                    <v-textarea
                            class="mb-6"
                            v-model="form.text"
                            :disabled="user === null"
                            :loading="loading"
                            no-resize
                            outlined
                            :placeholder="user ? 'Whats on your mind...':'Sign in to create a post'"
                            hint="You can use URLs and hashtags"
                            persistent-hint
                    ></v-textarea>
                    <v-file-input
                            :disabled="user === null"
                            id="imagesInput"
                            prepend-icon=""
                            prepend-inner-icon="mdi-image"
                            small-chips
                            multiple
                            label="Attach images to your post"
                            accept="image/x-png,image/gif,image/jpeg"
                    ></v-file-input>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                            v-if="user !== null"
                            color="primary"
                            @click="post"
                            :loading="loading"
                            block
                            x-large
                    >
                        Post
                    </v-btn>
                    <v-btn
                            v-else
                            color="primary"
                            text
                            :to="{name: 'SignIn'}"
                            block
                            x-large
                    >
                        Sign In
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>

    import * as fb from "../../firebase";
    import {mapGetters} from "vuex";
    import {v4 as uuidv4} from 'uuid';

    export default {
        name: "NewPostDialog",

        computed: {
            ...mapGetters(['user'])
        },

        data: () => ({
            dialog: false,
            files: [],
            form: {
                text: "",
            },
            loading: false,
        }),

        methods: {

            post() {
                if (!fb.auth.currentUser.uid) {
                    return
                }
                this.loading = true;
                this.uploadImages().then(imageURIs => {
                    this.createPost(imageURIs).then(() => {
                        this.loading = false;
                        this.files = [];
                    })
                })
            },

            findTags: function(value) {
                console.log(value)
                value = value.toString();
                let hashReg = /#\w+/gm;
                let tags = value.match(hashReg)
                tags = tags.map(x => x.replace("#", "").toLowerCase());
                console.log(tags)
                return tags
            },

            createPost(imageURIs) {
                return new Promise((resolve, reject) => {
                    fb.postsCollection.doc().set({
                        userID: fb.auth.currentUser.uid,
                        createdTime: new Date(),
                        likes: 0,
                        text: this.form.text,
                        images: imageURIs,
                        tags: this.findTags(this.form.text)
                    }).then(() => {
                        this.form.text = "";
                        this.dialog = false;
                    }).catch(error => {
                        console.log(error)
                        reject(error);
                    }).finally(() => {
                        resolve();
                    })
                })
            },

            async uploadImages() {
                const files = document.querySelector('#imagesInput').files;

                const promises = [];
                files.forEach(image => {
                    const filename = uuidv4();
                    const ext = image.name.split('.').pop();
                    const name = `${filename}${ext}`;
                    const task = fb.storage.child(name).put(image, { contentType: image.type });
                    promises.push(task);
                });

                return Promise.all(promises)
                    .then(snapshotsArray => {
                        // snapshotsArray is an array with a variable number of elements
                        // You again need to use Promise.all
                        const promises = [];
                        snapshotsArray.forEach(snapshot => {
                            promises.push(snapshot.ref.getDownloadURL());
                        })
                        return Promise.all(promises);
                    });

            }
        }
    }
</script>

<style scoped>

</style>