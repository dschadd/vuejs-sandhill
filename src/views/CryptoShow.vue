<template>
  <div class="crypto-show">
    <h1>{{ crypto.name }}</h1>

    <h3>Today's Price: ${{ crypto.daily_price["2018-12-04"]["4a. close (USD)"] }}</h3>

    <h3>NEWS</h3>
    <div v-for="newsItem in crypto.news">
      <a :href="newsItem.url" target="_blank">{{ newsItem.title }}</a>
    </div>
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
    axios.get("http://localhost:3000/api/cryptos/" + this.$route.params.id).then(response => {
      console.log(response.data);
      this.crypto = response.data;
    });
  },
  methods: {},
  computed: {}
};
</script>
