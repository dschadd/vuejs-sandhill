<template>
  <div class="company-show">
    <h1>{{ company.name }}</h1>
    <h2>Followers: {{ company.followers.length }}</h2>
    <h4>Today's Price: ${{ company.today_price }}</h4>

    <!--
      EXAMPLE OF VUE JS CODE FOR LOOPING THROUGH AN OBJECT
      <div v-for="(prices, date) in company.price">
        <h4>Today's Price: {{ prices["4. close"] }}</h4>
      </div>
    -->

    <h3>NEWS</h3>
    <div v-for="newsItem in company.news">
      <a :href="newsItem.url" target="_blank">{{ newsItem.title }}</a>
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
