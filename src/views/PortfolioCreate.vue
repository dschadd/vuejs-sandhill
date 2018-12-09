<template>
  <div class="portfolio-create">
    <h1>Create New Portfolio</h1>
    Name: <input v-model="newPortfolioName" type="text" /> Company ID:
    <input v-model="newCompanyID" type="text" /> Shares: <input v-model="newCompanyShares" type="text" /> Crypto ID:
    <input v-model="newCryptoID" type="text" /> Count: <input v-model="newCryptoCount" type="text" />
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
      newCompanyID: "",
      newCompanyShares: 0,
      newCryptoID: "",
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
      console.log(this.newPortfolioName);
      this.errors = [];
      var portfolioParams = {
        name: this.newPortfolioName,
        company_id: this.newCompanyID,
        shares: this.newCompanyShares,
        crypto_id: this.newCryptoID,
        count: this.newCryptoCount
      };
      axios
        .post("http://localhost:3000/api/portfolios", portfolioParams)
        .then(
          function(response) {
            console.log(response);
            this.newPortfolioName = "";
            this.newCompanyID = "";
            this.newCompanyShares = "";
            this.newCrypto = "";
            this.newCryptoCount = "";
            //       this.$router.push("/");
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
