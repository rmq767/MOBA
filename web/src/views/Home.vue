<template>
  <div>
    <!-- 轮播图 -->
    <swiper :options="swiperOption">
      <swiper-slide>
        <img
          class="w-100"
          src="../assets//images/210794580bb9303653804bb7b482f2a4.jpeg"
          alt
        />
      </swiper-slide>
      <swiper-slide>
        <img
          class="w-100"
          src="../assets//images/210794580bb9303653804bb7b482f2a4.jpeg"
          alt
        />
      </swiper-slide>
      <swiper-slide>
        <img
          class="w-100"
          src="../assets//images/210794580bb9303653804bb7b482f2a4.jpeg"
          alt
        />
      </swiper-slide>
      <div
        class="swiper-pagination pagination-home text-right px-3 pb-2"
        slot="pagination"
      ></div>
    </swiper>
    <!-- 导航图标 -->
    <div class="nav-icons bg-white mt-3 text-center pt-3 text-dark-1">
      <div class="d-flex flex-wrap">
        <div class="nav-item mb-3" v-for="n in 10" :key="n">
          <i class="sprite sprite-news"></i>
          <div class="py-2">爆料站</div>
        </div>
      </div>
      <div class="bg-light py-2 fs-sm">
        <i class="sprite sprite-arrow mr-2"></i>
        <span>收起</span>
      </div>
    </div>
    <!-- 卡片组件 -->
    <m-list-card title="新闻资讯" icon="menu1" :categories="newsCat">
      <template v-slot:items="{ category }">
        <router-link
          tag="div"
          :to="`/articles/${item._id}`"
          v-for="(item, index) in category.newsList"
          :key="index"
          class="py-2 fs-lg d-flex"
        >
          <span class="text-info">[{{ item.categoryName }}]</span>
          <span class="px-1">|</span>
          <span class="flex-1 text-dark text-ellipsis">{{ item.title }}</span>
          <span class="text-grey fs-sm pr-2">{{ item.createdAt | date }}</span>
        </router-link>
      </template>
    </m-list-card>

    <!-- 卡片组件 -->
    <m-list-card title="英雄列表" icon="card-hero" :categories="heroCat">
      <template v-slot:items="{ category }">
        <div class="d-flex flex-wrap" style="margin:0 -0.5rem;">
          <router-link
            :to="`/heroes/${item._id}`"
            tag="div"
            style="width:20%;"
            v-for="(item, index) in category.heroList"
            :key="index"
            class="p-2 text-center"
          >
            <img :src="item.avatar" alt="" class="w-100" />
            <div>{{ item.name }}</div>
          </router-link>
        </div>
      </template>
    </m-list-card>
  </div>
</template>

<script>
import dayjs from "dayjs";
export default {
  filters: {
    //格式化时间
    date(val) {
      return dayjs(val).format("MM/DD");
    }
  },
  props: [""],
  data() {
    return {
      swiperOption: {
        pagination: {
          el: ".pagination-home"
        },
        autoplay: { delay: 2000 }
      },
      newsCat: [],
      heroCat: []
    };
  },

  methods: {
    async fetchNewsCats() {
      const res = await this.$http.get("/news/list");
      this.newsCat = res.data;
    },
    async fetchHeroCats() {
      const res = await this.$http.get("/heroes/list");
      this.heroCat = res.data;
    }
  },

  components: {},

  computed: {},

  created() {
    this.fetchNewsCats();
    this.fetchHeroCats();
  }
};
</script>
<style lang="scss">
@import "../assets/css/_variables";
.pagination-home {
  .swiper-pagination-bullet {
    background: map-get($colors, "white");
    border-radius: 0.1538rem;
    opacity: 1;
    &.swiper-pagination-bullet-active {
      background: map-get($colors, "info");
    }
  }
}
.nav-icons {
  border-top: 1px solid $border-color;
  border-bottom: 1px solid $border-color;
  .nav-item {
    width: 25%;
    border-right: 1px solid $border-color;
    &:nth-child(4n) {
      border-right: none;
    }
  }
}
</style>
