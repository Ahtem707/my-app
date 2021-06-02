<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm2 offset-sm6 class="mt-5" v-if="loading">
        <v-progress-circular
          :size="70"
          :width="7"
          color="primary"
          indeterminate
        ></v-progress-circular>
      </v-flex>
      <v-flex xs12 sm6 offset-sm3 v-else-if="!loading && orders.length !== 0">
        <h1 class="text--secondatry mt-10 mb-3">Orderds</h1>
        <v-list flat subheader two-line>
          <v-list-item v-for="order in orders" :key="order.id">
            <v-list-item-action>
              <v-checkbox
                color="success"
                :input-value="order.done"
                @change="markDone(order)"
              ></v-checkbox>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ order.name }}</v-list-item-title>
              <v-list-item-subtitle>{{ order.phone }}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn class="primary" :to="'/ad/' + order.adId">Open</v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-flex>
      <v-flex xs12 sm6 offset-sm3 v-else>
        <h1 class="text--secondary">You hane no orders</h1>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  created() {
    this.$store.dispatch("fetchOrders");
  },
  computed: {
    orders() {
      return this.$store.getters.orders;
    },
    loading() {
      return this.$store.getters.loading;
    },
  },
  methods: {
    markDone(order) {
      this.$store
        .dispatch("markOrderDone", order.id)
        .then(() => {
          order.done = true;
        })
        .catch(() => {});
    },
  },
};
</script>