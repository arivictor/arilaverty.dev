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
                <v-card
                        elevation="1"
                        class="pa-5 rounded-lg"
                        :disabled="loading">
                    <v-alert
                            type="success"
                            text prominent
                            v-text="successMessage"
                            v-if="success"
                    ></v-alert>
                    <v-alert
                            type="error"
                            text
                            prominent
                            v-text="errorMessage"
                            v-if="error"
                    ></v-alert>
                    <v-card-title>
                        Reset Password
                    </v-card-title>
                    <v-card-subtitle>
                        You will receive instructions via email to reset your password
                    </v-card-subtitle>
                    <v-form @submit.prevent="resetPassword">
                        <v-card-text>
                            <v-text-field
                                    v-model="form.email"
                                    type="email"
                                    outlined
                                    label="Email"
                                    required
                            ></v-text-field>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn
                                    :loading="loading"
                                    type="submit"
                                    block
                                    color="primary"
                                    x-large>
                                Reset
                            </v-btn>
                        </v-card-actions>
                    </v-form>
                </v-card>
                <p class="text-center mt-5">
                    Already have an account?
                    <router-link :to="{name: 'SignIn'}">Sign In</router-link>
                </p>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import {auth} from '../firebase'

    export default {
        name: "ResetPassword",

        data: () => ({
            error: false,
            errorMessage: "Uh oh, something went wrong...",
            form: {
                email: "",
            },
            loading: false,
            success: false,
            successMessage: "Reset email has been sent"
        }),

        methods: {
            async resetPassword() {
                this.loading = true;
                await auth.sendPasswordResetEmail(this.email)
                    .then(() => {
                        this.success = true;
                    }).catch(() => {
                        this.error = true;
                    }).finally(() => {
                        this.loading = false;
                    })
            }
        }
    }
</script>

<style scoped>

</style>