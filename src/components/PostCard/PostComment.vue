<template>
    <div>
        <v-skeleton-loader type="list-item-avatar-three-line" v-if="user === null"></v-skeleton-loader>
        <v-row v-else
               class="mb-4">
            <v-col class="shrink">
                <v-avatar
                        class="elevation-1 white--text"
                        :color="user.picture ? 'white':'orange accent-4'"
                        size="50"
                >
                    <v-img :src="user.picture" v-if="user.picture"></v-img>
                    <span v-else>{{ user.name.slice(0,1) }}</span>
                </v-avatar>
            </v-col>
            <v-col class="grow">
                <v-card flat :color="$vuetify.theme.dark ? 'primary':'grey lighten-4'">
                    <v-card-subtitle>
                        <strong>{{ user.name }}</strong> • {{ formatDate(data.createdTime) }}
                    </v-card-subtitle>
                    <v-card-text v-html="$options.filters.parseURLs($options.filters.hashBold(data.text))">

                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
    import {mapGetters} from "vuex";
    const linkifyHtml = require('linkifyjs/html');

    const dayjs = require('dayjs')
    const calendar = require('dayjs/plugin/calendar')
    dayjs.extend(calendar)
    import * as fb from "../../firebase";

    export default {
        name: "PostComment",

        computed: {
            ...mapGetters(['language'])
        },

        created() {
            this.getUser()
        },

        data: () => ({
            user: null,
        }),

        filters: {
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
        },

        methods: {
            formatDate(value) {
                return dayjs(value.toDate()).calendar()
            },
            async getUser() {
                const usersRef = fb.db.collection('users').doc(this.data.userID);
                const doc = await usersRef.get();
                if (!doc.exists) {
                    this.user = {name: 'Not Found'}
                } else {
                    this.user = doc.data();
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