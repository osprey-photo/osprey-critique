<!--  eslint-disable -->
<template>
    <div class="container">
        <div class="box">
            <h1 class="title is-2">Welcome to Login page</h1>
        </div>
        <div class="box">
            <form  @submit.prevent="login">
                <h1>Sign in</h1>
                <label>User name</label>
                <input required v-model="username" type="text" placeholder="Snoopy" autofocus />
                <label>Password</label>
                <input required v-model="password" type="password" placeholder="Password" />
                <hr/>                
                <button type="submit">Login</button>
            </form>

        </div>
    </div>
</template>

<script>
/* eslint-disable */
    import {AUTH_REQUEST} from 'actions/auth'

    export default {
     name: 'login',       
     data () {
            return {
                username: '',
                password: '',
            }
        },
        methods: {
            login: function () {      
                  const { username, password } = this
                this.$store.dispatch(AUTH_REQUEST, { username, password }).then(() => {
                    this.$router.push('/')
                })
            }
        }
    }
</script>

<style scoped>
</style>