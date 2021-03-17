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
            <!-- <v-icon left>{{link.icon}}</v-icon> -->
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app dark color="blue">
      <v-app-bar-nav-icon @click="drawer=!drawer" class="hidden-md-and-up"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn
          v-for="link of links"
          :key="link.title"
          :href="link.url"
          text>
          <!-- <v-icon left>{{link.icon}}</v-icon> -->
          {{link.title}}
        </v-btn>
        <v-btn text>Link Two</v-btn>
        <v-btn text>Link Three</v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      links: [
        {title:'Login', icon: 'lock', url: '/login'},
        {title:'Registration', 'face': 'lock', url: '/registration'},
        {title:'Orders', icon: 'bookmark_border', url: '/orders'},
        {title:'New ad', icon: 'node_add', url: '/new'},
        {title:'My ads', icon: 'list', url: '/list'},
      ]
    }
  }
}
</script>