<template>
    <v-container>
        <v-row align="center" justify="center">
            <v-col cols="12" sm="12" md="6" lg="6">
                <v-alert type="error" text prominent v-if="error">
                    Looks like you're trying that too much, try again later...
                </v-alert>
                <v-alert v-else-if="user !== null && !user.identity.emailVerified && !verificationSent" type="warning"
                         text prominent>
                    Please verify your email, your posts will be moderated until then.
                    <v-btn :loading="loading" small color="orange" text @click="resendVerification">Resend Email</v-btn>
                </v-alert>
                <v-alert v-else-if="verificationSent && !user.identity.emailVerified" type="info" text prominent>
                    <strong>Thank you!</strong> Email verification has been resent to your inbox, please check your spam
                    folders.
                </v-alert>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import {mapGetters} from "vuex";
    import * as fb from "../../firebase";

    export default {
        name: "EmailVerifyAlert",

        computed: {
            ...mapGetters(['user']),
        },

        data: () => ({
            error: false,
            loading: false,
            verificationSent: false,
        }),

        methods: {
            resendVerification() {
                this.loading = true;
                fb.auth.currentUser.sendEmailVerification()
                    .then(() => {
                        this.verificationSent = true;
                    })
                    .catch(() => {
                        this.error = true;
                    })
                    .finally(() => {
                        this.loading = false;
                    })
            }
        }
    }
</script>

<style scoped>

</style>