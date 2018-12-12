<template>
  <div class="crypto-show">
    <h1>{{ crypto.name }}</h1>
    <h2>Followers: {{ crypto.followers.length }}</h2>
    <h3>Today's Price: ${{ crypto.today_price }}</h3>
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
      crypto: { today_price: "", followers: [], news: [], name: "" }
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
