<template>
  <v-container>
    <v-layout row>
      <v-form v-model="valid" ref="form" validation>
        <v-text-field
          prepend-icon="mdi-email"
          name="email"
          label="Email"
          type="email"
          :rules="emailRules"
          v-model="email"
        ></v-text-field>
        <v-text-field
          id="password"
          prepend-icon="mdi-form-textbox-password"
          name="password"
          label="Password"
          type="password"
          :rules="passwordRules"
          v-model="password"
        ></v-text-field>
        <v-btn
          color="primary"
          @click="onSubmit"
          :disabled="!valid"
        >Login</v-btn>
      </v-form>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length >= 6) || 'Password must be not less than 6 characters'
      ]
    }
  },
  methods:{
    onSubmit(){
      if(this.$refs.form.validate()){
        const user = {
          email: this.email,
          password: this.password
        }
        console.log(user)
      }
    }
  }
}
</script>