<template>
  <div id="app">
    <nav class="navbar has-background-dark">
      <div class="navbar-brand">
        <router-link to="/" class="navbar-item">
          <img src="static/logo.png" alt="Osprey Photo Critique" width="112" height="28">
          <h1 class="has-text-light is-size-3">Osprey Critique</h1>
        </router-link>
        <div class="navbar-burger burger" data-target="navbarExampleTransparentExample">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

    <div id="navbarExampleTransparentExample" class="navbar-menu y">
      <div class="navbar-start">
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="field is-grouped">
            <p class="control">
              <router-link to="/admin" class="button is-light">
                <span>Admin</span>
              </router-link>
            </p>
            <p class="control">
              <router-link to="/register" class="button is-light">
                <span>Register</span>
              </router-link>
            </p>
            <p class="control">
              <router-link to="/login" class="button is-primary">
                <span>Login</span>
              </router-link>
            </p>
            <p class="control">
              <a @click="logout" class="button is-primary">
                <span>Logout</span>
              </a>
            </p>
          </div>
        </div>
      </div>
      </div>
  </nav>

      <section class="section">
        <div class="container">
          <router-view/>
        </div>
      </section>
  </div>
</template>

<script>
import { AUTH_LOGOUT } from 'actions/auth'
export default {
  name: 'App',
  methods: {
    logout: function () {
      this.$store.dispatch(AUTH_LOGOUT).then(() => this.$router.push('/'))
    }
  }
}
</script>

<style>

</style>
