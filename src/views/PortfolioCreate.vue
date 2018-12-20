<template>
  <div class="portfolio-create" id="portfolio-create">
    <header class="jumbotron my-4">
      <h1 class="display-3">Create a new portfolio</h1>
      <p class="lead">Develop a portfolio of companies to begin your journey to achieve your financial goals.</p>
    </header>
    <div id="whole-form">
      <form>
        <div class="row">
          <div class="col-md-4"></div>
          <div class="col-md-2">
            <div class="form-group">
              <label for="formGroupExampleInput">Portfolio Name</label>
              <input
                v-model="newPortfolioName"
                type="text"
                class="form-control"
                id="formGroupExampleInput"
                placeholder="Name"
              />
            </div>
          </div>
          <div class="col-md-2">
            <div class="form-group">
              <label for="formGroupExampleInput2">Initial Investment</label>
              <input
                v-model="newInitialCash"
                type="number"
                class="form-control"
                id="formGroupExampleInput2"
                placeholder="10000"
              />
            </div>
          </div>
        </div>
      </form>
      <!--
        Name: <input v-model="newPortfolioName" type="text" /> Cash: <input v-model="newInitialCash" type="number" />
      -->
      <div class="row">
        <div class="col-md-4"></div>
        <div class="col-md-2">
          <div class="form-group">
            <label for="companyName">Company Name</label>
            <select v-model="newCompanyID" class="form-control" id="companyName">
              <option v-for="company in companies" v-bind:value="company.id"> {{ company.name }} </option>
            </select>
          </div>
        </div>

        <div class="col-md-2">
          <div class="form-group">
            <label for="formGroupExampleInput2">Shares</label>
            <input
              v-model="newCompanyShares"
              type="number"
              class="form-control"
              id="formGroupExampleInput2"
              placeholder="10"
            />
          </div>
        </div>
      </div>
      <!-- Shares: <input v-model="newCompanyShares" type="number" /> -->

      <div class="row">
        <div class="col-md-4"></div>
        <div class="col-md-2">
          <div class="form-group">
            <label for="cryptoName">Crypto Name</label>
            <select v-model="newCryptoID" class="form-control" id="cryptoName">
              <option v-for="crypto in cryptos" v-bind:value="crypto.id"> {{ crypto.name }} </option>
            </select>
          </div>
        </div>

        <div class="col-md-2">
          <div class="form-group">
            <label for="formGroupExampleInput2">Amount</label>
            <input
              v-model="newCryptoCount"
              type="number"
              class="form-control"
              id="formGroupExampleInput2"
              placeholder="10"
            />
          </div>
        </div>
      </div>

      <!-- Count: <input v-model="newCryptoCount" type="number" /> -->
      <!-- <input v-model="private" type="checkbox" value="true" /> Private<br /> -->
      <button v-on:click="createPortfolio();" class="btn btn-primary">Create</button>
    </div>
  </div>
</template>

<style>
#portfolio-create {
  background-image: url("https://i.imgur.com/WyItSYP.jpg");
  background-size: cover;
  height: 100vh;
}
label {
  color: white;
  font-weight: bold;
}
#whole-form {
  padding: 150px;
}
</style>

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
      newInitialCash: 0,
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
        count: this.newCryptoCount,
        initial_cash: this.newInitialCash
      };
      // axios.post("http://localhost:3000/api/company_portfolios", portfolioParams);
      // axios.post("http://localhost:3000/api/crypto_portfolios", portfolioParams);
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
            this.newInitialCash = "";
            //       this.$router.push("/");
          }.bind(this)
        )
        .catch(
          function(error) {
            console.log(error.response.data.errors);
            this.errors = error.response.data.errors;
          }.bind(this)
        );
      this.$route.push("/");
    }
  },
  computed: {}
};
</script>
