<template>
  <v-app>
    <v-navigation-drawer app v-model="drawer" temporary>
      <v-list>
        <v-list-item-group active-class="deep-purple--text text--accent-4">
          <v-list-item
            v-for="link of links"
            :key="link.title"
            :href="link.url">
            <v-list-item-title>{{link.title}}</v-list-item-title>
            <v-icon left>{{link.icon}}</v-icon>
          </v-list-item>
          <v-list-item v-if="this.isUserLoggedIn" text @click="onLogout"
          ><v-icon left>mdi-exit-to-app</v-icon>Logout</v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app dark color="blue">
      <v-app-bar-nav-icon @click="drawer=!drawer" class="hidden-md-and-up"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <router-link v-slot="{ navigate }" custom to="/" class="pointer">
        <span @click="navigate" role="link">Ad Apllication</span>
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn
          v-for="link of links"
          :key="link.title"
          :to="link.url"
          text>
          <v-icon left>{{link.icon}}</v-icon>
          {{link.title}}
        </v-btn>
        <v-btn v-if="this.isUserLoggedIn" text @click="onLogout">
          <v-icon left>mdi-exit-to-app</v-icon>Logout</v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <v-main>
      <router-view></router-view>
    </v-main>
    <template v-if="error">
      <v-snackbar
      :timeout="5000"
      :multi-line="true"
      color="error"
      @input="closeError"
      value="true">
        {{error}}
        <v-btn dark @click.native="closeError">Close</v-btn>
      </v-snackbar>
    </template>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
    }
  },
  computed: {
    error () {
      return this.$store.getters.error
    },
    isUserLoggedIn() {
      return this.$store.getters.isUserLoggedIn
    },
    links() {
      if(this.isUserLoggedIn) {
        return [
          {title:'Orders', icon: 'mdi-briefcase-download-outline', url: '/orders'},
          {title:'New ad', icon: 'mdi-plus-circle', url: '/new'},
          {title:'My ads', icon: 'mdi-briefcase-plus', url: '/myAds'}
        ]
      } else {
        return [
          {title:'Login', icon: 'mdi-login', url: '/login'},
          {title:'Registration', icon: 'mdi-account', url: '/registration'}
        ]
      }
    }
  },
  methods: {
    closeError () {
      this.$store.dispatch('clearError')
    },
    onLogout () {
      this.$store.dispatch('logoutUser')
      this.$router.push("/")
    }
  }
}
</script>

<style scoped>
  .pointer{
    cursor: pointer;
  }
</style>