<template>
  <div class="portfolio-show">
    <p>{{ portfolio.name }}</p>
    <div v-for="company in portfolio.companies">
      <p>{{ company.name }}</p>
    </div>
    <div v-for="crypto in portfolio.cryptos">
      <p>{{ crypto.name }}</p>
    </div>
    <p>{{ portfolio.initial_cash }}</p>
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
