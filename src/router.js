import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Signup from "./views/Signup.vue";
import Login from "./views/Login.vue";
import Logout from "./views/Logout.vue";
import PortfolioCreate from "./views/PortfolioCreate.vue";
import PortfolioShow from "./views/PortfolioShow.vue";
import CompanyIndex from "./views/CompanyIndex.vue";
import CompanyShow from "./views/CompanyShow.vue";
import CryptoIndex from "./views/CryptoIndex.vue";
import CryptoShow from "./views/CryptoShow.vue";

Vue.use(Router);

export default new Router({
    routes: [
        { path: "/", name: "home", component: Home },
        { path: "/signup", name: "signup", component: Signup },
        { path: "/login", name: "login", component: Login },
        { path: "/logout", name: "logout", component: Logout },
        { path: "/portfolios/create", name: "portfolio-create", component: PortfolioCreate },
        { path: "/portfolios/:id", name: "portfolio-show", component: PortfolioShow },
        { path: "/companies", name: "company-index", component: CompanyIndex },
        { path: "/companies/:id", name: "company-show", component: CompanyShow },
        { path: "/cryptos/", name: "crypto-index", component: CryptoIndex },
        { path: "/cryptos/:id", name: "crypto-show", component: CryptoShow }
    ]
});
