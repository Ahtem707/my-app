<template>
  <v-dialog v-model="modal" width="400px">
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" dark class="green">Buy</v-btn>
    </template>
    <v-card>
      <v-container>
        <v-layout row>
          <v-flex xs>
            <v-card-title>
              <h1 class="text--primary">Do you wan't to buy it?</h1>
            </v-card-title>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs>
            <v-card-text>
              <v-text-field
                name="name"
                label="Your name"
                type="text"
                v-model="name"
              ></v-text-field>
              <v-text-field
                name="phone"
                label="Your phone"
                type="text"
                v-model="phone"
              ></v-text-field>
            </v-card-text>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text @click="onCancel" :disabled="localLoading">Close</v-btn>
              <v-btn
                color="success"
                @click="onSave"
                :disabled="localLoading"
                :loading="localLoading"
              >Buy it</v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      modal: false,
      name: "",
      phone: "",
      localLoading: false
    };
  },
  props: ["ad"],
  created() {
    const user = this.$store.getters.user
    console.log("Buy> ",user)
    this.name = user.displayName,
    this.phone = user.phoneNumber
  },
  methods: {
    onCancel() {
      this.name = ""
      this.phone = ""
      this.modal = false;
    },
    onSave() {
        if (this.name !== '' && this.phone !== '') {
            this.localLoading = true
            this.$store.dispatch('createOrder', {
                name: this.name,
                phone: this.phone,
                adId: this.ad.id,
                ownerId: this.ad.ownerId
            })
            .finally(() => {
                this.localLoading = false
                this.name = ""
                this.phone = ""
                this.modal = false
            })
        }
    },
  },
};
</script>