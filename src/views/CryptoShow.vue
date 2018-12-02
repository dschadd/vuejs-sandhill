<template>
  <div class="crypto-show">
    <p>{{ crypto.name }}</p>
    <p>{{ crypto.daily_price["2018-12-01"]["4a. close (USD)"] }}</p>
    <p>{{ crypto.news[0]["title"] }}</p>
  </div>
</template>

<style></style>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      crypto: {}
    };
  },
  created: function() {
    axios.get("http://localhost:3000/api/cryptos/1").then(response => {
      console.log(response.data);
      this.crypto = response.data;
    });
  },
  methods: {},
  computed: {}
};
</script>
