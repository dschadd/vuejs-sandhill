<template>
  <div class="crypto-show">
    <div v-if="crypto.loading" class="container">
      <img src="https://cdn-images-1.medium.com/max/1600/0*cWpsf9D3g346Va20.gif" alt="" />
    </div>
    <div v-else class="container">
      <div class="row">
        <h1 class="my-4">
          {{ crypto.name }} <small>Followers: {{ crypto.followers.length }}</small>
        </h1>
        <small><button v-on:click="addFollow();" class="btn btn-info ml-2 mt-4">Follow</button></small>
        </div>
        <!--
          EXAMPLE OF VUE JS CODE FOR LOOPING THROUGH AN OBJECT
          <div v-for="(prices, date) in company.price">
            <h4>Today's Price: {{ prices["4. close"] }}</h4>
          </div>
        -->

        <div class="row">
          <div class="col-md-6">
            <img class="img-fluid" v-bind:src="crypto.news[0].urlToImage" alt="" />
          </div>
          <div class="col-md-2">
            <h4 class="my-3">{{ crypto.news[0].title }}</h4>
            <p>{{ crypto.news[0].description }}</p>
          </div>
          <div class="col-md-4">
            <canvas id="myChart" width="400" height="400"></canvas>
          </div>
        </div>

        <div class="row">
          <div v-for="newsItem in crypto.news" class="col-md-4 mt-4">
            <div class="card">
              <img class="card-img-top" v-bind:src="newsItem.urlToImage" alt="Article Image" />
              <div class="card-body">
                <h5 class="card-title">{{ newsItem.title }}</h5>
                <p class="card-text">{{ newsItem.description }}</p>
                <a v-bind:href="newsItem.url" target="_blank" class="btn btn-secondary">Keep Reading</a>
              </div>
            </div>
          </div>
        </div>
      </div>
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
      crypto: { loading: true, today_price: "", followers: [], news: [], name: "" }
    };
  },
  created: function() {
    var cryptoKey = `crypto-${this.$route.params.id}`;
    axios.get("http://localhost:3000/api/cryptos/" + this.$route.params.id)
      .then(response => {
        console.log(response.data);
        this.crypto = response.data;
        this.setupChart();
        // localStorage.setItem(cryptoKey, JSON.stringify(this.company));
      });
    // .catch(error => {
    //   console.log("error, using localStorage", error);
    //   this.crypto = JSON.parse(localStorage.getItem(cryptoKey));
    //   this.setupChart();
    // });-
  },
  methods: {
    setupChart: function() {
      var dates = [];
      var prices = [];

      for (var dkey in this.crypto.price) {
        dates.push(dkey);
      }
      console.log(dates);
      var datesIndex = dates.length - 1;
      var orderedDates = [];
      while (datesIndex > 0) {
        orderedDates.push(dates[datesIndex]);
        datesIndex = datesIndex - 1;
      }

      for (var pkey in this.crypto.price) {
        var pobj = this.crypto.price[pkey];
        prices.push(pobj["4a. close (USD)"]);
      }
      console.log(prices);
      var pricesIndex = prices.length - 1;
      var orderedPrices = [];
      while (pricesIndex > 0) {
        orderedPrices.push(prices[pricesIndex]);
        pricesIndex = pricesIndex - 1;
      }

      var self = this;
      setTimeout(function() {
        var ctx = document.getElementById("myChart").getContext("2d");
        self.fillData(ctx, orderedDates, orderedPrices);
      }, 0);
    },
    fillData: function(ctx, orderedDates, orderedPrices) {
      var myChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: orderedDates,
          datasets: [
            {
              label: "Price",
              data: orderedPrices,
              pointRadius: 1,
              backgroundColor: "rgba(173, 216, 230, 1)"
            }
          ]
        },
        options: {
          legend: {
            display: false
          },
          scales: {
            yAxes: [
              {
                ticks: {
                }
              }
            ],
            xAxes: [
              {
                gridLines: {
                  display: false
                }
              }
            ]
          }
        }
      });
    }
  },
  computed: {}
};
</script>
