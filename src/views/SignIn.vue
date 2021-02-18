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
                <v-alert
                        type="success"
                        text
                        prominent
                        v-if="$route.query.success"
                        v-text="$route.query.success"
                ></v-alert>
                <v-card
                        elevation="1"
                        class="pa-5 rounded-lg"
                        :disabled="loading">
                    <v-card-title>Sign In</v-card-title>
                    <v-form @submit.prevent="signin">
                        <v-card-text>
                            <v-text-field
                                    v-model="form.email"
                                    type="email"
                                    outlined
                                    label="Email"
                                    required
                            ></v-text-field>
                            <v-text-field
                                    v-model="form.password"
                                    type="password"
                                    outlined
                                    label="Password"
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
                                Sign In
                            </v-btn>
                        </v-card-actions>
                    </v-form>
                </v-card>
                <p class="text-center mt-5">
                    Don't have an account?
                    <router-link :to="{name: 'Register'}">Register</router-link>
                </p>
                <p class="text-center">
                    <router-link :to="{name: 'ResetPassword'}">I forgot my password</router-link>
                </p>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        name: "SignIn",

        data: () => ({
            form: {
                email: "",
                password: "",
            },
            loading: false,
        }),

        methods: {
            signin() {
                this.loading = true;
                this.$store.dispatch('signin', this.form).then(() => {
                    this.$router.push({name: 'Home'})
                }).catch(error => {
                    alert("Uh oh")
                    console.log(error)
                }).finally(() => {
                    this.loading = false;
                })
            }
        }
    }
</script>

<style scoped>

</style>