<template>
  <v-app>
    <v-main>
      <v-container fill-height="fill-height">
        <v-layout justify-center="justify-center">
          <v-flex class="login-form text-xs-center">
            <h1 class="text-center">
              <div class="display-1 mb-3">
                <v-icon class="mr-2" large="large">work</v-icon> MyWorkspace
              </div>
            </h1>
            <v-card light="light">
              <v-toolbar dark color="primary">
                <v-toolbar-title> Crate a new account </v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form v-model="options.valid" ref="form" lazy-validation>
                  <v-text-field
                    name="name"
                    v-model="user.name"
                    light="light"
                    prepend-icon="person"
                    label="Name"
                    :rules="nameRules"
                  ></v-text-field>
                  <v-text-field
                    name="email"
                    v-model="user.email"
                    light="light"
                    prepend-icon="email"
                    label="Email"
                    type="email"
                    :rules="emailRules"
                  ></v-text-field>
                  <v-text-field
                    name="password"
                    v-model="user.password"
                    light="light"
                    prepend-icon="lock"
                    label="Password"
                    type="password"
                    :counter="6"
                    :rules="passwordRules"
                  ></v-text-field>
                  <v-text-field
                    name="confirmPassoword"
                    v-model="user.confirmPassword"
                    light="light"
                    prepend-icon="lock"
                    label="Confirm password"
                    type="password"
                    :counter="6"
                    :rules="confirmPasswordRules"
                  ></v-text-field>
                  <v-btn
                    block="block"
                    type="submit"
                    @click="submit()"
                    :disabled="!options.valid"
                    :class="{ primary: options.valid }"
                    >Sign up</v-btn
                  >
                </v-form>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      options: {
        shouldStayLoggedIn: false,
        valid: false,
      },
      user: {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      nameRules: [
        (v) => !!v || "Name is required",
        (v) =>
          (v && v.length >= 6) ||
          "Name must be more or equel than 6 characters",
      ],
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      passwordRules: [
        (v) => !!v || "Password is required",
        (v) =>
          (v && v.length >= 6) || "Password must be more or equel than 6 characters",
      ],
      confirmPasswordRules: [
        (v) => !!v || "Password is required",
        (v) => v === this.user.password || "Password should match",
      ],
    };
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        const user = {
          email: this.user.email,
          password: this.user.password,
        };
        console.log(user);
      }
    },
  },
};
</script>

<style scoped>
.login-form {
  max-width: 500px;
}
</style>