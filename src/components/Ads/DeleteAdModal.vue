<template>
  <v-dialog v-model="modal" width="400px">
    <template v-slot:activator="{ on }">
      <v-btn class="mx-3" color="error" v-on="on">Delete</v-btn>
    </template>
    <v-card>
      <v-container>
        <v-layout row>
          <v-flex xs>
            <v-card-title>
              <h1 class="text--primary">Delete Ad</h1>
            </v-card-title>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs>
            <v-card-text>
              <h2>Are you sure about this?</h2>
            </v-card-text>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text @click="onCancel">Cancel</v-btn>
              <v-btn color="error" @click="onDelete">Delete</v-btn>
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
        editedTitle: this.ad.title,
        editedDesc: this.ad.desc
    }
  },
  props: [
    'ad'
  ],
  methods: {
    onCancel (){
      this.editedTitle = this.ad.title
      this.editedDesc = this.ad.desc
      this.modal = false
    },
    onDelete (){
      this.$store.dispatch('deleteAd', {
            id: this.ad.id
        })
      this.modal = false
    }
  }
};
</script>