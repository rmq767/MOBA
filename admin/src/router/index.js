import Vue from "vue";
import VueRouter from "vue-router";
import Main from "../views/Main.vue";
import Login from "../views/Login.vue";
import Category from "../views/Category.vue";
import CategoryList from "../views/CategoryList.vue";
import Item from "../views/Item.vue";
import ItemList from "../views/ItemList.vue";
import Hero from "../views/Hero.vue";
import HeroList from "../views/HeroList.vue";
import Article from "../views/Article.vue";
import ArticleList from "../views/ArticleList.vue";
import Ad from "../views/Ad.vue";
import AdList from "../views/AdList.vue";
import AdminUser from "../views/AdminUser.vue";
import AdminUserList from "../views/AdminUserList.vue";

Vue.use(VueRouter);

const routes = [{
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      isPublic: true
    }
  },
  {
    path: "/",
    name: "main",
    component: Main,
    children: [{
        path: "/categories/create",
        component: Category
      },
      {
        path: "/categories/edit/:id", //这里是编辑页面，引用创建页面
        component: Category,
        props: true //表示把任何url参数都注入到Category页面里面
      },
      {
        path: "/categories/list",
        component: CategoryList
      },
      {
        path: "/items/create",
        component: Item
      },
      {
        path: "/items/edit/:id", //这里是编辑页面，引用创建页面
        component: Item,
        props: true //表示把任何url参数都注入到Item页面里面
      },
      {
        path: "/items/list",
        component: ItemList
      },
      {
        path: "/heroes/create",
        component: Hero
      },
      {
        path: "/heroes/edit/:id", //这里是编辑页面，引用创建页面
        component: Hero,
        props: true //表示把任何url参数都注入到Hero页面里面
      },
      {
        path: "/heroes/list",
        component: HeroList
      },
      {
        path: "/articles/create",
        component: Article
      },
      {
        path: "/articles/edit/:id", //这里是编辑页面，引用创建页面
        component: Article,
        props: true //表示把任何url参数都注入到Article页面里面
      },
      {
        path: "/articles/list",
        component: ArticleList
      },
      {
        path: "/ads/create",
        component: Ad
      },
      {
        path: "/ads/edit/:id", //这里是编辑页面，引用创建页面
        component: Ad,
        props: true //表示把任何url参数都注入到Ad页面里面
      },
      {
        path: "/ads/list",
        component: AdList
      },
      {
        path: "/admin_users/create",
        component: AdminUser
      },
      {
        path: "/admin_users/edit/:id", //这里是编辑页面，引用创建页面
        component: AdminUser,
        props: true //表示把任何url参数都注入到Ad页面里面
      },
      {
        path: "/admin_users/list",
        component: AdminUserList
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

// 路由守卫
router.beforeEach((to, from, next) => {
  if (!to.meta.isPublic && !localStorage.token) {
    return next("/login");
  }
  next();
});

export default router;