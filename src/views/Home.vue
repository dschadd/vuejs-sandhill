<template>
  <div class="home">
    <p>{{ user.first_name }}</p>
    <p>{{ user.portfolios }}</p>
    <p>{{ user.companies }}</p>
    <p>{{ user.cryptos }}</p>
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
    axios.get("http://localhost:3000/api/users/1").then(response => {
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
