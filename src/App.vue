<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Auth0 with Vue/Vuetify</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn to="/" class="mr-2">Home</v-btn>
      <v-btn to="/about" class="mr-2">About</v-btn>
      <v-btn to="/contact" class="mr-2">Contact</v-btn>
      <v-btn to="/members" class="mr-2">Members</v-btn>
    </v-toolbar>

    <v-content>
      {{clientId}}
      <router-view></router-view>
    </v-content>

  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data () {
    return {
      clientId: process.env.VUE_APP_AUTH0_CONFIG_DOMAIN
    }
  },
  beforeCreate(){

  }
}
</script>
