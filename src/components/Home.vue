<template>
  <div>
    <v-container fluid>
      <v-carousel>
        <v-carousel-item
          v-for="(item, i) in items"
          :key="i"
          :src="item.src"
          :to="item.link"
          reverse-transition="fade-transition"
          transition="fade-transition"
        ></v-carousel-item>
      </v-carousel>
    </v-container>
    <v-container class="row align-items-center">
      <v-card
      class="mx-auto" 
      max-width="344"
      v-for="(item,i) in items"
      :key="i"
      >
        <v-img
          :src="item.src"
          height="200px"
        ></v-img>
        <v-card-title>{{item.title}}</v-card-title>
        <v-card-subtitle>{{item.subtitle}}</v-card-subtitle>
        <v-card-actions>
          <v-btn color="orange lighten-2" text :to="item.link"> Explore </v-btn>
          <v-spacer></v-spacer>
          <v-btn icon @click="show = !show">
            <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
          </v-btn>
        </v-card-actions>
        <v-expand-transition>
          <div v-show="show">
            <v-divider></v-divider>
            <v-card-text>
              {{item.cardText}}
            </v-card-text>
          </div>
        </v-expand-transition>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import data from "../data.json";
export default {
  data() {
    return {
      items: data.items,
      show: false,
    };
  },
};
</script>