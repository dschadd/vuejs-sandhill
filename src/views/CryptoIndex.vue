<template>
  <div class="crypto-index">
    <div class="row">
      <div v-for="crypto in cryptos" class="col-md-4 mt-4">
        <div class="card border-secondary">
          <img class="card-img-top" v-bind:src="crypto.image" alt="Crypto logo" height="300" />
          <div class="card-body">
            <h5 class="card-title">{{ crypto.name }}</h5>
            <a v-bind:href="`/#/cryptos/${crypto.id}`" class="btn btn-secondary">Visit Crypto Page</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      cryptos: {}
    };
  },
  created: function() {
    axios
      .get("http://localhost:3000/api/cryptos")
      .then(response => {
        this.cryptos = response.data;
        localStorage.setItem("cryptos", JSON.stringify(this.cryptos));
      })
      .catch(error => {
        console.log("Error, loading from localStorage", error);
        this.cryptos = JSON.parse(localStorage.getItem("cryptos"));
      });
  },
  methods: {},
  computed: {}
};
</script>
