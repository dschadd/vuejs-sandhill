<template>
  <div class="company-index">
    <div v-for="company in companies">
      <div class="card border-secondary mb-3" style="width: 18rem;">
        <img class="card-img-top" src="https://www.brandeps.com/logo-download/A/Apple-02.png" alt="Card image cap" />
        <div class="card-body">
          <h5 class="card-title">{{ company.name }}</h5>
          <a href="#" class="btn btn-secondary">Visit Company Page</a>
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
      companies: {}
    };
  },
  created: function() {
    axios.get("http://localhost:3000/api/companies").then(response => {
      this.companies = response.data;
    });
  },
  methods: {},
  computed: {}
};
</script>
