<template>
  <div class="login" id="login-page">
    <div class="container">
      <div class="card text-center">
        <div class="card-body">
          <h4 class="card-title">Login</h4>
          <form v-on:submit.prevent="submit();" class="card-text">
            <ul>
              <li class="text-danger" v-for="error in errors">{{ error }}</li>
            </ul>
            <div class="form-group">
              <label>Email:</label> <input type="email" class="form-control" v-model="email" />
            </div>
            <div class="form-group">
              <label>Password:</label> <input type="password" class="form-control" v-model="password" />
            </div>
            <input type="submit" class="btn btn-primary" value="Submit" />
          </form>
        </div>
        <div class="card-footer text-muted">A Daniel J Project</div>
      </div>
      <form></form>
    </div>
  </div>
</template>

<style>
/*body {
  overflow: hidden;
}*/
#login-page {
  background-image: url("http://yesofcorsa.com/wp-content/uploads/2016/03/831202_road.jpg");
  background-size: cover;
  height: 100vh;
  padding-top: 300px;
}
#login-page .container {
  opacity: 0.9;
}
</style>

<script>
import axios from "axios";

export default {
  template: "#login-page",
  data: function() {
    return {
      email: "",
      password: "",
      errors: []
    };
  },
  methods: {
    submit: function() {
      var params = {
        email: this.email,
        password: this.password
      };
      axios
        .post("http://localhost:3000/api/sessions", params)
        .then(response => {
          axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);
          this.$router.push("/");
        })
        .catch(error => {
          this.errors = ["Invalid email or password."];
          this.email = "";
          this.password = "";
        });
    }
  }
};
</script>
