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
                    <v-card-title>
                        Register
                    </v-card-title>
                    <v-form @submit.prevent="register">
                        <v-card-text>
                            <v-text-field
                                    v-model="form.name"
                                    type="text"
                                    outlined
                                    label="Your Name"
                                    required
                            ></v-text-field>
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
                            <v-text-field
                                    v-model="form.passwordConfirm"
                                    type="password"
                                    outlined
                                    label="Confirm Password"
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
                                Register
                            </v-btn>
                        </v-card-actions>
                    </v-form>
                </v-card>
                <p class="text-center mt-5">
                    Already have an account?
                    <router-link :to="{name: 'SignIn'}">
                        Sign In
                    </router-link>
                </p>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        name: "Register",

        data: () => ({
            form: {
                name: "",
                email: "",
                password: "",
                passwordConfirm: "",
            },
            loading: false,
        }),

        methods: {
            register() {
                this.loading = true;
                this.$store.dispatch('register', this.form).then(() => {
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