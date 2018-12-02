<template>
  <div class="company-show">
    <p>{{ company.name }}</p>
    <p>{{ company.daily_price["2018-11-30"]["4. close"] }}</p>
    <p>{{ company.news[0]["title"] }}</p>
  </div>
</template>

<style></style>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      company: {}
    };
  },
  created: function() {
    axios.get("http://localhost:3000/api/companies/1").then(response => {
      console.log(response.data);
      this.company = response.data;
    });
  },
  methods: {},
  computed: {}
};
</script>
