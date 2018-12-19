<template>
  <div v-if="user.loading" class="container">
    <img src="https://cdn-images-1.medium.com/max/1600/0*cWpsf9D3g346Va20.gif" alt="" />
  </div>
  <div v-else class="home" id="home">
    <header class="jumbotron my-4">
      <h1 class="display-3">Welcome, {{ user.first_name }}</h1>
      <p class="lead">
        Sandhill is a sandbox environment for investors interested in technology. Get started below by creating a
        portfolio, or if you're a regular view your portfolios and securities.
      </p>
      <a href="/#/portfolios/create" class="btn btn-secondary btn-lg">Create portfolio</a>
    </header>

    <div v-for="portfolio in user.portfolios">
      <div class="row">
        <div class="col-md-7 mt-2">
          <a href="#">
            <img
              class="img-fluid rounded mb-3 mb-md-0"
              src="https://i.imgur.com/WUyab8a.jpg"
              height="300"
              width="700"
              alt=""
            />
          </a>
        </div>
        <div class="col-md-5">
          <h3>{{ portfolio.name }}</h3>
          <a v-bind:href="`/#/portfolios/${portfolio.id}`" class="btn btn-secondary mt-2">View Portfolio</a>
        </div>
      </div>
    </div>

    <div class="row">
      <div v-for="company in user.companies" class="col-md-4 mt-4">
        <img class="card-img-top" src="http://placehold.it/500x325" alt="Article Image" />
        <div class="card-body">
          <h5 class="card-title">{{ company.company_name }}</h5>
          <p class="card-text">Test</p>
          <a v-bind:href="`/#/companies/${company.company_id}`" class="btn btn-secondary">Keep Reading</a>
        </div>
      </div>
      <div v-for="crypto in user.cryptos" class="col-md-4 mt-4">
        <img class="card-img-top" src="http://placehold.it/500x325" alt="Article Image" />
        <div class="card-body">
          <h5 class="card-title">{{ crypto.crypto_name }}</h5>
          <p class="card-text">Test</p>
          <a v-bind:href="`/#/cryptos/${crypto.crypto_id}`" class="btn btn-secondary">Keep Reading</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
/*#home {
  background-image: url("https://i.imgur.com/Wjp2g9D.jpg");
  background-size: cover;
}*/
</style>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      message: "Welcome to Vue.js!!!!!",
      user: { loading: true },
      companies: [],
      cryptos: [],
      newPortfolioName: "",
      newPortfolioPrivate: false,
      newPortfolioCompany: "",
      newPortfolioCrypto: "",
      portfolioImages: [
        "https://i.imgur.com/WUyab8a.jpg",
        "https://i.imgur.com/3EHUHoZ.jpg",
        "https://i.imgur.com/Ufxmsle.jpg"
      ]
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
