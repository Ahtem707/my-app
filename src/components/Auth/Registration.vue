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
          :rules="confirmPasswordRules"
          v-model="password"
        ></v-text-field>
        <v-btn color="primary" @click="onSubmit" :disabled="!valid">Regist</v-btn>
      </v-form>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+/.test(v) || "E-mail must be valid",
      ],
      confirmPasswordRules: [
        (v) => !!v || "Password is required",
        (v) => v === this.password || "Password should match",
      ],
    };
  },
  methods: {
    onSubmit() {
      if (this.$refs.form.validate()) {
        const user = {
          email: this.email,
          password: this.password,
        };
        console.log(user);
      }
    },
  },
};
</script>