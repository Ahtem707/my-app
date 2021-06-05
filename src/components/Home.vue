<template>
  <div v-if="!loading">
    <v-container>
      <v-layout row>
        <v-flex xs12>
          <v-carousel>
            <v-carousel-item
              v-for="ad in promoAds"
              :key="ad.id"
              :src="ad.src"
              reverse-transition="fade-transition"
              transition="fade-transition">
              <div class="carousel-link">
                <v-btn class="success" :to="'/ad/'+ad.id">{{ad.title}}</v-btn>
              </div>
            </v-carousel-item>
          </v-carousel>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container grid-list-lg>
      <v-layout row wrap>
        <v-flex
          xs12
          sm6
          md4
          v-for="ad of ads"
          :key="ad.id"
        >
          <v-card class="mx-auto" max-width="500px">
            <v-img
              :src="ad.src"
              height="200px"
            ></v-img>
            <v-card-title primaty-title style="height:100px">
              <div style="height: inherit; text-align: top">
                <h3 class="headline mb-0">{{ ad.title }}</h3>
              </div>
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn flet :to="'/ad/'+ad.id" class="mr-3">Open</v-btn>
              <app-vue-modal :ad="ad"></app-vue-modal>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
  <div v-else>
    <v-container>
    <v-layout row>
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
  </div>
</template>

<script>
export default {
  computed: {
    promoAds() {
      return this.$store.getters.promoAds
    },
    ads() {
      return this.$store.getters.ads
    },
    loading() {
      return this.$store.getters.loading
    }
  }
}
</script>

<style scoped>
  .carousel-link{
    position: absolute;
    bottom: 50px;
    left: 50%;
    background: rgba(0,0,0,0.5);
    transform: translate(-50%,0);
    padding: 5px 15px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }
</style>