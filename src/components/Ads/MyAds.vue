<template>
  <v-container>
    <v-layout row v-if="!loading && myAds.length !== 0">
      <v-flex xs12 sm6 offset-sm3>
        <h1 class="text--secondary mt-10 mb-3">My ads</h1>
        <v-card
          class="elevation-10 mb-3"
          v-for="ad in myAds"
          :key="ad.id"
          max-width="500px"
        >
          <v-layout>
            <v-flex xs4>
              <v-img :src="ad.src" height="175px"></v-img>
            </v-flex>
            <v-flex xs8>
              <v-card-text>
                <h2 class="text--primary">{{ ad.title }}</h2>
                <p>{{ ad.description }}</p>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn class="info" :to="'/ad/' + ad.id">Open</v-btn>
              </v-card-actions>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout raw v-else-if="!loading && myAds.length === 0">
      <v-flex xs12 sm6 offset-sm3>
        <h1 class="text--primary">You have no ads.</h1>
      </v-flex>
    </v-layout>
    <v-layout raw v-else>
      <v-flex xs12 sm2 offset-sm6 class="mt-5">
        <v-progress-circular
          :size="70"
          :width="7"
          color="primary"
          indeterminate
        ></v-progress-circular>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  computed: {
    myAds() {
      return this.$store.getters.myAds;
    },
    loading() {
      return this.$store.getters.loading;
    },
  },
};
</script>