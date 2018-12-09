<template>
  <div class="home">
    <h3>Welcome, {{ user.first_name }}</h3>

    <div><a v-bind:href="`/#/newportfolio/`" class="btn btn-primary mt-2">Create Portfolio</a></div>

    <div v-for="portfolio in user.portfolios">
      <a v-bind:href="`/#/portfolios/${portfolio.id}`" class="btn btn-primary mt-2">{{ portfolio.name }}</a>
    </div>

    <div v-for="company in user.companies">
      <a v-bind:href="`/#/companies/${company.company_id}`" class="btn btn-primary mt-2">{{ company.company_name }}</a>
    </div>
    <div v-for="crypto in user.cryptos">
      <a v-bind:href="`/#/cryptos/${crypto.crypto_id}`" class="btn btn-primary mt-2">{{ crypto.crypto_name }}</a>
    </div>
  </div>
</template>

<style></style>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      message: "Welcome to Vue.js!!!!!",
      user: {},
      companies: [],
      cryptos: [],
      newPortfolioName: "",
      newPortfolioPrivate: false,
      newPortfolioCompany: "",
      newPortfolioCrypto: ""
    };
  },
  created: function() {
    axios.get("http://localhost:3000/api/users/current_user").then(response => {
      this.user = response.data;
    });
  },
  methods: {
    createPortfolio: function() {
      var params = {
        name: this.newPortfolioName,
        private: this.newPortfolioPrivate
      };
      axios.post("http://localhost:3000/api/portfolios", params).then(
        function(response) {
          console.log(response);
          this.portfolios.push(response.data);
          this.newPortfolioName = "";
          this.newPortfolioPrivate = "";
          this.newPortfolioCompany = "";
          this.newPortfolioCrypto = "";
        }.bind(this)
      );
    }
  },
  computed: {}
};
</script>
