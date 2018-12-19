<template>
  <div class="signup" id="signup-page">
    <div class="container">
      <form v-on:submit.prevent="submit();">
        <h1>Signup</h1>
        <ul>
          <li class="text-danger" v-for="error in errors">{{ error }}</li>
        </ul>
        <div class="form-group"><label>Name:</label> <input type="text" class="form-control" v-model="name" /></div>
        <div class="form-group"><label>Email:</label> <input type="email" class="form-control" v-model="email" /></div>
        <div class="form-group">
          <label>Password:</label> <input type="password" class="form-control" v-model="password" />
        </div>
        <div class="form-group">
          <label>Password confirmation:</label>
          <input type="password" class="form-control" v-model="passwordConfirmation" />
        </div>
        <input type="submit" class="btn btn-primary" value="Submit" />
      </form>
    </div>
  </div>
</template>

<style>
#signup-page {
  background-image: url("http://yesofcorsa.com/wp-content/uploads/2016/03/831202_road.jpg");
  background-size: cover;
  height: 100vh;
  padding-top: 300px;
}
</style>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      errors: []
    };
  },
  methods: {
    submit: function() {
      var params = {
        name: this.name,
        email: this.email,
        password: this.password,
        password_confirmation: this.passwordConfirmation
      };
      axios
        .post("http://localhost:3000/api/users", params)
        .then(response => {
          this.$router.push("/login");
        })
        .catch(error => {
          this.errors = error.response.data.errors;
        });
    }
  }
};
</script>
