<template>
    <v-container class="container-card">
        <v-row class="row-card">
            <v-col cols="12" class="d-flex justify-center align-center col-card">
                <v-card width="350" min-width="310">
                    <v-card-title class="d-flex justify-center">
                        <p>Sign in to App</p>
                    </v-card-title>
                    <v-card-text>
                        <v-form ref="form" v-model="valid" lazy-validation>
                            <v-text-field v-model="name" :counter="16" :rules="nameRules" label="Name" required></v-text-field>

                            <v-text-field v-model="password" :rules="passRules" type="password" label="Password" required></v-text-field>

                            <v-card-actions class="d-flex justify-center">
                                <v-btn :disabled="!valid" color="primary" class="mr-4" @click="submit">
                                    Sign in
                                </v-btn>
                            </v-card-actions>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import {mapMutations} from 'vuex'
    
    export default {
        name: 'LogIn',

        data: () => ({
            valid: true,
            name: '',
            nameRules: [
                v => !!v || 'Name is required',
                v => (v && v.length <= 16) || 'Name must be less than 16 characters',
            ],
            password: '',
            passRules: [
                v => !!v || 'Password is required',
                v => /[a-zA-Z0-9]/.test(v) || 'Use english letters and numbers',
                v => (v && v.length >= 4) || 'Password must be at least 4 characters'
            ]
        }),

        methods: {
            ...mapMutations({
               addUser: 'users/addUser' 
            }),
            submit() {
                if(this.$refs.form.validate()){
                   this.addUser(this.name);
                   this.$router.push("/personal-area");  
                }
            }
        }
    }

</script>

<style scoped>
    .container-card {
        height: 100%;
    }

    .row-card {
        height: 100%;
    }

    .col-card {
        height: 100%;
    }

</style>
