<template>

    <v-app-bar
            color="primary"
            app
            flat
            dense
            dark
            fixed
    >
        <v-toolbar-title>ARI<strong>LAVERTY</strong></v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn icon :to="{name: 'Home'}">
            <v-icon>mdi-home-outline</v-icon>
        </v-btn>

        <v-btn icon @click="signout" v-if="isSignedIn">
            <v-icon>mdi-logout</v-icon>
        </v-btn>

        <v-btn icon :to="{name: 'SignIn'}" v-else>
            <v-icon>mdi-login</v-icon>
        </v-btn>

        <v-btn icon @click="toggleTheme">
            <v-icon v-text="this.$vuetify.theme.dark ? 'mdi-circle-slice-8':'mdi-circle-outline'"></v-icon>
        </v-btn>

    </v-app-bar>
</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        name: "AppBar",

        computed: {
            ...mapGetters(['user']),
            isSignedIn() {
                return this.user !== null;
            }
        },

        data: () => ({}),

        methods: {
            signout() {
                this.$store.dispatch('signout')
                    .then(() => {
                        this.$router.push({name: 'SignIn', query: {success: "You have signed out, see you next time!"}})
                    })
            },
            toggleTheme() {
                this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
            }
        }
    }
</script>

<style scoped>

</style>