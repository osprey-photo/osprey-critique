<!--  eslint-disable -->
<template>
<div>
    <div class="box">
        <h1 class="title is-2">Welcome to administrator page</h1>

    </div>
    <ul>
      <li v-if="isProfileLoaded">
        <router-link to="/account">{{name}}</router-link>
      </li>
      <li v-if="isAuthenticated" @click="logout">
        <span class="logout">Logout</span>
      </li>
      <li v-if="!isAuthenticated">
        <router-link to="/login">Login</router-link>
      </li>
    </ul>
</div>
</template>

<script>

/* eslint-disable */

 import { mapGetters, mapState } from 'vuex'
  import { AUTH_LOGOUT } from 'actions/auth'
  export default {
    name: 'navigation',
    methods: {
      logout: function () {
        this.$store.dispatch(AUTH_LOGOUT).then(() => this.$router.push('/login'))
      }
    },
    computed: {
      ...mapGetters(['getProfile', 'isAuthenticated', 'isProfileLoaded']),
      ...mapState({
        authLoading: state => state.auth.status === 'loading',
        name: state => `${state.user.profile.title} ${state.user.profile.name}`,
      })
    }
  }
</script>

<style scoped>
</style>