<template>
  <div class="company-index">
    <div class="row">
      <div v-for="company in companies" class="col-md-4 mt-2">
        <div class="card border-secondary">
          <img class="card-img-top" v-bind:src="company.image" alt="Company logo" />
          <div class="card-body">
            <h5 class="card-title">{{ company.name }}</h5>
            <a v-bind:href="`/#/companies/${company.id}`" class="btn btn-secondary">Visit Company Page</a>
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
      companies: {}
    };
  },
  created: function() {
    axios
      .get("http://localhost:3000/api/companies")
      .then(response => {
        this.companies = response.data;
        localStorage.setItem("companies", JSON.stringify(this.companies));
      })
      .catch(error => {
        console.log("Error, loading from localStorage", error);
        this.companies = JSON.parse(localStorage.getItem("companies"));
      });
  },
  methods: {},
  computed: {}
};
</script>
