<template>
  <div id="app">
    <!-- Navigation -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div class="container">
        <a class="navbar-brand" href="#">Sandhill</a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarResponsive"
          aria-controls="navbarResponsive"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item active">
              <a class="nav-link" href="/#/">Home <span class="sr-only">(current)</span> </a>
            </li>
            <li class="nav-item" v-if="!isLoggedIn"><a class="nav-link" href="/#/signup">Signup</a></li>
            <li class="nav-item" v-if="!isLoggedIn"><a class="nav-link" href="/#/login">Login</a></li>
            <li class="nav-item"><a class="nav-link" href="/#/companies">Companies</a></li>
            <li class="nav-item"><a class="nav-link" href="/#/cryptos">Cryptos</a></li>
            <li class="nav-item" v-if="isLoggedIn"><a class="nav-link" href="/#/logout">Logout</a></li>
          </ul>
        </div>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}
#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

<script>
export default {
  data: function() {
    return {
      isLoggedIn: false
    };
  },
  created: function() {
    console.log("hello");
    if (localStorage.getItem("jwt")) {
      this.isLoggedIn = true;
    }
  }
};
</script>
