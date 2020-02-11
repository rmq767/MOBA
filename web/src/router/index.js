import Vue from "vue";
import VueRouter from "vue-router";
import Main from "../views/Main.vue";
import Home from "../views/Home.vue";
import Article from "../views/Article.vue";
import Hero from "../views/Hero.vue";

Vue.use(VueRouter);

const routes = [{
    path: "/",
    component: Main,
    children: [{
        path: "/",
        name: "home",
        component: Home
      },
      {
        path: "/articles/:id",
        name: "article",
        component: Article,
        props: true //接收参数
      }
    ]
  },
  {
    path: "/heroes/:id",
    name: "hero",
    component: Hero,
    props: true //接收参数
  }
];

const router = new VueRouter({
  routes
});

export default router;