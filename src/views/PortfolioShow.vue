<template>
  <div class="portfolio-show">
    <canvas id="portfolio" width="200" height="200"></canvas>

    <div v-for="company in portfolio.companies[0].portfolio_data">
      <div v-if="company.portfolio_id === portfolio_id">
        <div>{{ portfolio.companies[0].company_name }}</div>

        <p>{{ company.shares }}</p>
        <p>{{ company.purchase_price }}</p>
      </div>
    </div>

    <div v-for="crypto in portfolio.cryptos[0].portfolio_data">
      <div v-if="crypto.portfolio_id === portfolio_id">
        <p>{{ portfolio.cryptos[0].crypto_name }}</p>
        <p>{{ crypto.count }}</p>
        <p>{{ crypto.purchase_price }}</p>
      </div>
    </div>

    <p>{{ portfolio.initial_cash }}</p>
  </div>
</template>

<style></style>

<script>
/* global Chart */
import axios from "axios";

export default {
  data: function() {
    return {
      portfolio: {},
      portfolio_id: ""
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
              data: [10, 20, 30]
            }
          ],
          labels: ["Red", "Yellow", "Blue"]
        },
        options: {}
      });
    }

    // calculateAssets: function() {
    //   var companyAssets =
  },
  computed: {}
};
</script>
