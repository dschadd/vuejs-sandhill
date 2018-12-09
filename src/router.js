import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Signup from "./views/Signup.vue";
import Login from "./views/Login.vue";
import Logout from "./views/Logout.vue";
import Portfolio from "./views/PortfolioShow.vue";
import CompanyShow from "./views/CompanyShow.vue";
import CompanyIndex from "./views/CompanyIndex.vue";
import CryptoShow from "./views/CryptoShow.vue";
// import CryptoIndex from "./views/CryptoIndex.vue";
// import PortfolioCreate from "./views/PortfolioCreate.vue";

Vue.use(Router);

export default new Router({
    routes: [
        { path: "/", name: "home", component: Home },
        { path: "/signup", name: "signup", component: Signup },
        { path: "/login", name: "login", component: Login },
        { path: "/logout", name: "logout", component: Logout },
        { path: "/portfolios/:id", name: "portfolio-show", component: Portfolio },
        { path: "/companies/:id", name: "company-show", component: CompanyShow },
        { path: "/companies", name: "company-index", component: CompanyIndex },
        { path: "/cryptos/:id", name: "crypto-show", component: CryptoShow }
        // { path: "/cryptos/", name: "crypto-index", component: CryptoIndex },
        // { path: "/portfolios/new", name: "portfolio-create", component: PortfolioCreate }
    ]
});
