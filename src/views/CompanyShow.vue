<template>
  <div class="company-show">
    <div class="container">
      <h1 class="my-4">
        {{ company.name }} <small>${{ company.today_price }}</small>
      </h1>
      <canvas id="myChart" width="400" height="400"></canvas>
      <h2>Followers: {{ company.followers.length }}</h2>

      <!--
        EXAMPLE OF VUE JS CODE FOR LOOPING THROUGH AN OBJECT
        <div v-for="(prices, date) in company.price">
          <h4>Today's Price: {{ prices["4. close"] }}</h4>
        </div>
      -->

      <div class="row">
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
      company: { today_price: "", followers: [], name: "", news: [] }
    };
  },
  created: function() {
    axios.get("http://localhost:3000/api/companies/" + this.$route.params.id).then(response => {
      this.company = response.data;
      console.log(this.company.price);

      var dates = [];
      var prices = [];

      for (var dkey in this.company.price) {
        dates.push(dkey);
      }
      console.log(dates);

      for (var pkey in this.company.price) {
        var pobj = this.company.price[pkey];
        prices.push(pobj["4. close"]);
      }

      var self = this;
      setTimeout(function() {
        var ctx = document.getElementById("myChart").getContext("2d");
        self.fillData(ctx, dates, prices);
      }, 0);
    });
  },
  mounted() {
    console.log("mounted");
  },
  methods: {
    fillData: function(ctx, dates, prices) {
      var myChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: dates,
          datasets: [
            {
              label: "Price",
              data: prices
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
    }
  },
  computed: {}
};
</script>
