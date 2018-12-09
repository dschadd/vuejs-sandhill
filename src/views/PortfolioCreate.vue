<template>
  <div class="portfolio-create">
    <h1>Create New Portfolio</h1>
    Name: <input v-model="newPortfolioName" type="text" /> Company: <input v-model="newCompany" type="text" /> Shares:
    <input v-model="newCompanyShares" type="text" /> Crypto: <input v-model="newCrypto" type="text" /> Count:
    <input v-model="newCryptoCount" type="text" />
    <button v-on:click="createPortfolio();" class="btn btn-primary">Create</button>
  </div>
</template>

<style></style>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      newPortfolioName: "",
      newCompany: "",
      newCompanyShares: 0,
      newCrypto: "",
      newCryptoCount: 0,
      companies: [],
      cryptos: []
    };
  },
  created: function() {
    axios.get("http://localhost:3000/api/companies").then(response => {
      this.companies = response.data;
    });
    axios.get("http://localhost:3000/api/cryptos").then(response => {
      this.cryptos = response.data;
    });
  },
  methods: {
    createPortfolio: function() {
      console.log("createPortfolio");
      this.errors = [];
      var params = {
        input_name: this.newPortfolioName
        // input_company: this.newCompany,
        // input_shares: this.newCompanyShares,
        // input_crypto: this.newCrypto,
        // input_count: this.newCryptoCount
      };
      axios
        .post("http://localhost:3000/api/portfolios", params)
        .then(
          function(response) {
            console.log(response);
            this.newPortfolioName = "";
            // this.newCompany = "";
            // this.newCompanyShares = "";
            // this.newCrypto = "";
            // this.newCryptoCount = "";
            this.$router.push("/");
          }.bind(this)
        )
        .catch(
          function(error) {
            console.log(error.response.data.errors);
            this.errors = error.response.data.errors;
          }.bind(this)
        );
    }
  },
  computed: {}
};
</script>
