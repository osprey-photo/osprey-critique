<template>
  <div id="app">

  <nav class="navbar  is-transparent is-dark" role="navigation" aria-label="main navigation" >
        <div class="navbar-brand">
          <a class="navbar-item" href="https://bulma.io">
            <img src="static/logo-wide.png" alt="Osprey-critique"
              width="112" height="28">
          </a>
          <div class="navbar-burger burger" data-target="navbarExampleTransparentExample">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
    
        <div id="navbarExampleTransparentExample" class="navbar-menu">
          <div class="navbar-start">
            <a class="navbar-item">
              Home
            </a>
            <div class="navbar-item has-dropdown is-hoverable">
              <a class="navbar-link" href="/documentation/overview/start/">
                Docs
              </a>
              <div class="navbar-dropdown is-boxed">
                <a class="navbar-item" href="/documentation/overview/start/">
                   <router-link to="/coins/ethereum">Ethereum</router-link>
                </a>
                <a class="navbar-item" href="https://bulma.io/documentation/modifiers/syntax/">
                  Modifiers
                </a>
                <a class="navbar-item" href="https://bulma.io/documentation/columns/basics/">
                  Columns
                </a>
                <a class="navbar-item" href="https://bulma.io/documentation/layout/container/">
                  Layout
                </a>
                <a class="navbar-item" href="https://bulma.io/documentation/form/general/">
                  Form
                </a>
                <hr class="navbar-divider">
                <a class="navbar-item" href="https://bulma.io/documentation/elements/box/">
                  Elements
                </a>
                <a class="navbar-item is-active" href="https://bulma.io/documentation/components/breadcrumb/">
                  Components
                </a>
              </div>
            </div>
          </div>
    
          <div class="navbar-end">
            <div class="navbar-item">
              <div class="field is-grouped">
                <p class="control">
                  <a class="bd-tw-button button">
                    <span>
                      Login
                    </span>
                  </a>
                </p>
                <p class="control">
                  <a class="button is-primary" href="https://github.com/jgthms/bulma/archive/0.5.1.zip">
                    <span>More Osprey</span>
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </nav>




    <router-link :to="{ name: 'Hello' }">Home</router-link>
    <router-link to="/about">About</router-link>
    <router-link to="/coins/ethereum">Ethereum</router-link>
    <router-link to="/coins/bitcoin">Bitcoin</router-link>



    <router-view/>


  </div>
</template>

<script>
  
  

export default {
  name: 'App',
      data: () => ({
      schema: schema,
      model: {}
    }),
    methods: {
      submit (e) {
        // this.model contains the valid data according your JSON Schema.
        // You can submit your model to the server here
      }
    },
    components: {  }
}
</script>

<style lang='sass'>
  /* $primary: #4c4c6e Override Bulma theme defaults */
  $dark: #564787;

  $color1: rgba(194, 148, 138, 1);
  $color2: rgba(126, 168, 190, 1);
  $color3: rgba(86, 71, 135, 1);
  $color4: rgba(248, 240, 251, 1);
  $color5: rgba(219, 203, 216, 1);

  $primary: $color1;

  @import "../node_modules/bulma/bulma.sass"
</style>