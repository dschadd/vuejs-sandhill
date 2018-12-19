<template>
  <div class="company-show">
    <div v-if="company.loading" class="container">
      <img src="https://cdn-images-1.medium.com/max/1600/0*cWpsf9D3g346Va20.gif" alt="" />
    </div>
    <div v-else class="container">
      <h1 class="my-4">
        {{ company.name }} <small>Today's price${{ company.today_price }}</small>
      </h1>
      <canvas id="myChart" width="400" height="400"></canvas>
      <div>
        <h2>Followers: {{ company.followers.length }}</h2>
        <button v-on:click="addFollow();" class="btn btn-primary">Follow</button>
        <!-- <a href="" class="btn btn-secondary">Follow</a> -->
      </div>
      <!--
        EXAMPLE OF VUE JS CODE FOR LOOPING THROUGH AN OBJECT
        <div v-for="(prices, date) in company.price">
          <h4>Today's Price: {{ prices["4. close"] }}</h4>
        </div>
      -->

      <div v-if="company.news && company.news.length > 0" class="row">
        <div class="col-md-8"><img class="img-fluid" v-bind:src="company.news[0].urlToImage" alt="" /></div>
        <div class="col-md-4">
          <h3 class="my-3">{{ company.news[0].title }}</h3>
          <p>{{ company.news[0].description }}</p>
        </div>
      </div>

      <div class="row">
        <div v-for="newsItem in company.news" class="col-md-4 mt-4">
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
</template>

<style></style>

<script>
/* global Chart */
import axios from "axios";
// import { Chart } from "vue-chartjs";

export default {
  data: function() {
    return {
      company: { loading: true, today_price: "", followers: [], name: "", news: [] }
    };
  },
  created: function() {
    var companyKey = `company-${this.$route.params.id}`;
    axios
      .get("http://localhost:3000/api/companies/" + this.$route.params.id)
      .then(response => {
        this.company = response.data;
        this.setupChart();
        localStorage.setItem(companyKey, JSON.stringify(this.company));
      })
      .catch(error => {
        console.log("error, using localStorage", error);
        this.company = JSON.parse(localStorage.getItem(companyKey));
        this.setupChart();
      });
  },

  mounted() {
    console.log("mounted");
  },
  methods: {
    setupChart: function() {
      var dates = [];
      var prices = [];

      for (var dkey in this.company.price) {
        dates.push(dkey);
      }
      console.log(dates);
      var datesIndex = dates.length - 1;
      var orderedDates = [];
      while (datesIndex > 0) {
        orderedDates.push(dates[datesIndex]);
        datesIndex = datesIndex - 1;
      }
      console.log(orderedDates);

      for (var pkey in this.company.price) {
        var pobj = this.company.price[pkey];
        prices.push(pobj["4. close"]);
      }
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
              data: orderedPrices
            }
          ]
        },
        options: {
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true
                }
              }
            ]
          }
        }
      });
    },
    addFollow: function() {
      console.log("this worked");
      var followParams = { company_id: this.$route.params.id, follow: true };
      axios.post("http://localhost:3000/api/company_follows", followParams);
    }
  },
  computed: {}
};
</script>
