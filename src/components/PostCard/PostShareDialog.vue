<template>
    <v-dialog
            v-model="dialog"
            width="500"
    >
        <template v-slot:activator="{ on, attrs }">
            <v-btn v-on="on" v-bind="attrs" icon large>
                <v-icon v-text="'mdi-share-variant-outline'"></v-icon>
            </v-btn>
        </template>

        <v-card>
            <v-card-title>
                Share Post
            </v-card-title>

            <v-card-text>
                <v-alert type="success" text v-if="copied">Copied to clipboard</v-alert>
               <v-text-field @focus="copyToClipboard" :color="copied ? 'green accent-4':'primary'" ref="postShareUrl" :value="shareLink" filled readonly :append-icon="copied ? 'mdi-check':'mdi-clipboard-outline'" @click:append="copyToClipboard"></v-text-field>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        name: "PostShareDialog",

        created() {
            this.shareLink = "http://arilaverty.dev/post/" + this.data;
        },

        data: () => ({
            copied: false,
            dialog: false,
            shareLink: "http://arilaverty.dev",
        }),

        methods: {
            copyToClipboard() {
                let textToCopy = this.$refs.postShareUrl.$el.querySelector('input')
                textToCopy.select()
                document.execCommand("copy");
                this.copied = true;
            }
        },

        props: {
            data: String,
        }
    }
</script>

<style scoped>

</style>