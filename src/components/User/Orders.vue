<template>
  <v-flex xs12 sm6 offset-sm3>
    <v-list>
      <v-list-tile>
        <h1 class="text--secondary">Orders</h1>
        <v-list-tile-action>
          <v-checkbox
            v-for="order in orders"
            :key="order.id"
            :input-value="order.done"
            @change="markDone(order)"
            :to="'/ad/' + order.idAd"
            :label="order.name + ': '+order.phone"
          ></v-checkbox>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Notifications</v-list-tile-title>
          <v-list-tile-sub-title>Allow notifications</v-list-tile-sub-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-btn class="primary">Open</v-btn>
        </v-list-tile-action>
      </v-list-tile>
    </v-list>
  </v-flex>
</template>

<script>
export default {
  data() {
    return {
      orders: [
        {
          id: "abc",
          name: "Даша",
          phone: "+7(978)123-45-78",
          idAd: "123",
          done: false,
        },
      ],
    };
  },
  methods: {
    markDone() {

    }
  }
};
</script>
