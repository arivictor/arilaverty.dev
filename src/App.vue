<template>
    <v-app :style="{ background: $vuetify.theme.themes[theme].background }">
        <app-bar></app-bar>
        <v-main>
            <email-verify-alert></email-verify-alert>
            <router-view></router-view>
        </v-main>
    </v-app>
</template>

<script>
    import AppBar from "./components/AppBar/AppBar";
    import EmailVerifyAlert from "./components/Global/EmailVerifyAlert";

    export default {
        name: 'App',
        components: {
            EmailVerifyAlert,
            AppBar,
        },
        computed: {
            theme() {
                return this.$vuetify.theme.dark ? 'dark':'light';
            }
        },
    };
</script>
