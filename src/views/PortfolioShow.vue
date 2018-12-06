<template>
  <div class="portfolio-show">
    <p>{{ portfolio.name }}</p>
    <p>{{ portfolio.companies }}</p>
    <p>{{ portfolio.cryptos }}</p>
  </div>
</template>

<style></style>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      portfolio: {}
    };
  },
  created: function() {
    axios.get("http://localhost:3000/api/portfolios/" + this.$route.params.id).then(response => {
      this.portfolio = response.data;
    });
  },
  methods: {},
  computed: {}
};
</script>
