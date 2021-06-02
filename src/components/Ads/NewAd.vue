<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h1 class="text--secondary mt-10 mb-3">Create new ad</h1>
        <v-form v-model="valid" ref="form" validation class="mb-3">
          <v-text-field
            name="titile"
            label="Ad title"
            light="light"
            type="text"
            v-model="title"
            required
            :rules="[(v) => !!v || 'Title is required']"
          >
          </v-text-field>
          <v-textarea
            name="description"
            label="Ad description"
            type="text"
            v-model="desc"
            light="light"
            multi-line
            :rules="[(v) => !!v || 'Description is required']"
            class="mb-5"
          ></v-textarea>
        </v-form>
        <v-layout row class="mb-3">
          <img :src="imageSrc" height="150" class="mt-3" v-if="imageSrc">
          <v-flex xs12>
            <v-btn 
              v-if="!imageSrc"
              class="mt-3"
              color="warning"
              @click="triggerUpload"
              >Upload
            <v-icon right dark>mdi-cloud-upload</v-icon>
            </v-btn>
            <v-btn 
              v-if="imageSrc"
              class="mt-3"
              color="error"
              @click="imageSrc='';image=null"
              >Delete
            <v-icon right dark>mdi-cloud-delete</v-icon>
            </v-btn>
            <input 
              ref="fileInput" 
              type="file" 
              style="display:none;" 
              accept="image/*"
              @change="onFileChange"
            >
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12>
            <img
              src=""
              height="150"
            />
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12>
            <v-switch
              label="Ad to promo?"
              v-model="promo"
              color="primary"
            ></v-switch>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12>
            <v-spacer></v-spacer>
            <v-btn :disabled="(!valid && !image) || loading" :loading="loading" class="success" @click="createAd">Create ad</v-btn>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      desc: "",
      promo: false,
      valid: false,
      image: null,
      imageSrc: ""
    };
  },
  methods: {
    createAd() {
        if(this.$refs.form.validate() && this.image) {
            const ad = {
                title: this.title,
                desc: this.desc,
                promo: this.promo,
                image: this.image
            }
            this.$store.dispatch('createAd',ad)
            .then(() => {
              this.$router.push("/list")
              console.log("newAd.vue/createAd/then")
            })
            .catch(() => {})
              console.log("newAd.vue/createAd/catch")
            }
    },
    triggerUpload () {
      this.$refs.fileInput.click()
    },
    onFileChange (event) {
      const file = event.target.files[0]

      const reader = new FileReader()
      reader.onload = () => {
        this.imageSrc = reader.result
      }
      reader.readAsDataURL(file)
      this.image = file
    }
  },
  computed: {
    loading() {
      return this.$store.getters.loading
    }
  }
};
</script>