<template>
    <v-menu offset-y>
        <template v-slot:activator="{ on: menu, attrs }">
            <v-tooltip top>
                <template v-slot:activator="{ on: tooltip }">
                    <v-btn
                        v-bind="attrs"
                        v-on="{ ...tooltip, ...menu }"
                        icon
                    >
                        <v-icon v-text="optionsIcon"></v-icon>
                    </v-btn>
                </template>
                <span>Post Options</span>
            </v-tooltip>
        </template>
        <v-list dense>
            <v-list-item @click="deletePost" :disabled="!usersPost">
                <v-list-item-action>
                    <v-icon>
                        mdi-trash-can-outline
                    </v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title v-text="'Delete Post'"></v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-menu>
</template>

<script>
    import * as fb from "../../firebase";

    export default {
        name: "PostCardMenu",

        computed: {
            usersPost() {
                if (fb.auth.currentUser) {
                    return fb.auth.currentUser.uid === this.data.userID;
                }
                return false;
            }
        },

        data: () => ({
            optionsIcon: 'mdi-dots-horizontal',
        }),

        methods: {
            async deletePost() {
                const docRef = fb.postsCollection.doc(this.data.id);
                const doc = await docRef.get();
                if (doc.exists) {
                    await docRef.delete();
                }
            },
        },

        props: {
            data: Object,
        }
    }
</script>

<style scoped>

</style>