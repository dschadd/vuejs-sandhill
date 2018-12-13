<template>
  <div class="company-show">
    <div class="container">
      <h1 class="my-4">
        {{ company.name }} <small>${{ company.today_price }}</small>
      </h1>

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

      <h3>NEWS</h3>
      <div v-for="newsItem in company.news">
        <div class="card" style="width: 18rem;">
          <img class="card-img-top" v-bind:src="newsItem.urlToImage" alt="Article Image" />
          <div class="card-body">
            <h5 class="card-title">{{ newsItem.title }}</h5>
            <!-- <a :href="newsItem.url" target="_blank" class="card-title">{{ newsItem.title }}</a> -->
            <p class="card-text">{{ newsItem.description }}</p>
            <a href="newsItem.url" target="_blank" class="btn btn-primary">Keep Reading</a>
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
      company: { today_price: "", followers: [], name: "", news: [] }
    };
  },
  created: function() {
    axios.get("http://localhost:3000/api/companies/" + this.$route.params.id).then(response => {
      this.company = response.data;
      console.log(this.company.price);
    });
  },
  methods: {},
  computed: {}
};
</script>
