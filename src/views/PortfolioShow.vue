<template>
  <div class="portfolio-show">
    <div v-if="portfolio.loading" class="container">
      <img src="https://cdn-images-1.medium.com/max/1600/0*cWpsf9D3g346Va20.gif" alt="" />
    </div>
    <div v-else class="container">
      <h1 class="mt-2">{{ portfolio.name }}</h1>
      <div class="row">
        <div class="col-md-4 mt-4"><canvas id="portfolio" width="200" height="200"></canvas></div>

        <div class="col-md-4 mt-4">
          <div v-for="company in portfolio.companies[0].portfolio_data">
            <div v-if="company.portfolio_id === portfolio_id">
              <img
                class="card-img-top"
                v-bind:src="portfolio.companies[0].company_image"
                alt="Article Image"
                height="300"
              />
              <div class="card-body">
                <h5 class="card-title">{{ portfolio.companies[0].company_name }}</h5>
                <p class="card-text">Shares: {{ company.shares }}</p>
                <p class="card-text">Purchase price: {{ company.purchase_price }}</p>
                <a v-bind:href="`/#/companies/${company.company_id}`" class="btn btn-secondary">Visit Company Page</a>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-4 mt-4">
          <div v-for="crypto in portfolio.cryptos[0].portfolio_data">
            <div v-if="crypto.portfolio_id === portfolio_id">
              <img
                class="card-img-top"
                v-bind:src="portfolio.cryptos[0].crypto_image"
                alt="Article Image"
                height="300"
              />
              <div class="card-body">
                <h5 class="card-title">{{ portfolio.cryptos[0].crypto_name }}</h5>
                <p class="card-text">Count {{ crypto.count }}</p>
                <p class="card-text">Count {{ crypto.purchase_price }}</p>
                <a v-bind:href="`/#/cryptos/${crypto.crypto_id}`" class="btn btn-secondary">Visit Crypto Page</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h1>Initial Cash: {{ portfolio.initial_cash }}</h1>
    </div>
  </div>
</template>

<style></style>

<script>
/* global Chart */
import axios from "axios";

export default {
  data: function() {
    return {
      portfolio: { loading: true },
      portfolio_id: "",
      companyAssets: "",
      cryptoAssets: "",
      currentCash: ""
    };
  },
  created: function() {
    var portfolioKey = `portfolio-${this.$route.params.id}`;
    axios
      .get("http://localhost:3000/api/portfolios/" + this.$route.params.id)
      .then(response => {
        this.portfolio = response.data;
        this.portfolio_id = this.portfolio.id;
        localStorage.setItem(portfolioKey, JSON.stringify(this.portfolio));
      })
      .catch(error => {
        console.log("error, using localStorage", error);
        this.portfolio = JSON.parse(localStorage.getItem(portfolioKey));
      });
  },
  mounted() {
    var self = this;
    setTimeout(function() {
      // this.calculateAssets();
      self.createChart();
    }, 5000);
  },
  methods: {
    createChart: function() {
      var ctx = document.getElementById("portfolio").getContext("2d");
      var myPieChart = new Chart(ctx, {
        type: "pie",
        data: {
          datasets: [
            {
              data: [10, 20, 30],
              backgroundColor: ["rgba(210, 180, 140, 1)", "rgba(139, 69, 19, 1)"]
            }
          ],
          labels: ["Ethereum", "Tesla", "Cash"]
        },
        options: {}
      });
    }
    // calculateAssets: function() {
    //   if (this.portfolio.companies[0].portfolio_data.portfolio_id === this.portfolio_id) {
    //     var companyAssets =
    //       this.portfolio.companies[0].portfolio_data.shares * this.portfolio.companies[0].portfolio_data.purchase_price;
    //   }
    //   if (this.portfolio.cryptos[0].portfolio_data.portfolio_id === this.portfolio_id) {
    //     var cryptoAssets =
    //       this.portfolio.cryptos[0].portfolio_data.shares * this.portfolio.cryptos[0].portfolio_data.purchase_price;
    //   }
    //   var currentCash = this.portfolio.initial_cash - companyAssets - cryptoAssets;
    //   var chartData = [];
    //   chartData.push(companyAssets, cryptoAssets, currentCash);
    //   return chartData;
    // }
  },
  computed: {}
};
</script>
