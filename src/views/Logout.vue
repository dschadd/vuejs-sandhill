<template>
  <div class="logout"></div>
</template>

<script>
import axios from "axios";

export default {
  created: function() {
    delete axios.defaults.headers.common["Authorization"];
    localStorage.removeItem("jwt");
    console.log("root data", this.$root.$data);
    this.$root.$data.isLoggedIn = false;
    this.$router.push("/login");
  }
};
</script>
