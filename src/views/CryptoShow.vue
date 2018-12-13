<!--
  <template>
    <div class="crypto-show">
      <h1></h1>
      <h2>Followers: </h2>
      <h3>Today's Price: $</h3>
      <h3>NEWS</h3>
      <div v-for="newsItem in crypto.news">
        <a :href="newsItem.url" target="_blank">{{ newsItem.title }}</a>
      </div>
    </div>
  </template>
-->

<template>
  <div class="company-show">
    <div class="container">
      <h1 class="my-4">
        {{ crypto.name }} <small>${{ crypto.today_price }}</small>
      </h1>

      <h2>Followers: {{ crypto.followers.length }}</h2>

      <!--
        EXAMPLE OF VUE JS CODE FOR LOOPING THROUGH AN OBJECT
        <div v-for="(prices, date) in company.price">
          <h4>Today's Price: {{ prices["4. close"] }}</h4>
        </div>
      -->

      <div class="row">
        <div class="col-md-8"><img class="img-fluid" v-bind:src="crypto.news[0].urlToImage" alt="" /></div>
        <div class="col-md-4">
          <h3 class="my-3">{{ crypto.news[0].title }}</h3>
          <p>{{ crypto.news[0].description }}</p>
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
</template>

<style></style>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      crypto: { today_price: "", followers: [], news: [], name: "" }
    };
  },
  created: function() {
    axios.get("http://localhost:3000/api/cryptos/" + this.$route.params.id).then(response => {
      console.log(response.data);
      this.crypto = response.data;
    });
  },
  methods: {},
  computed: {}
};
</script>
