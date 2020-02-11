<template>
  <div class="page-article" v-if="this.model">
    <!-- 如果不加model，可能会报错 -->
    <div class="d-flex py-3 px-2">
      <div class="iconfont icon-Back text-blue"></div>
      <div class="flex-1 text-blue">
        {{ model.title }}
      </div>
      <div class="text-grey fs-xs">
        {{ model.createdAt | date }}
      </div>
    </div>
    <div v-html="model.body" class="px-4 fs-lg body"></div>
    <div class="px-3 border-top py-3">
      <div class="d-flex jc-center">
        <i class="iconfont icon-menu1"></i>
        <strong class="text-blue fs-lg ml-1">相关资讯</strong>
      </div>
      <div class="pt-2 fs-lg">
        <router-link
          class="py-1"
          tag="div"
          v-for="item in model.related"
          :key="item._id"
          :to="`/articles/${item._id}`"
          >{{ item.title }}</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
export default {
  filters: {
    //格式化时间
    date(val) {
      return dayjs(val).format("YYYY-MM-DD");
    }
  },
  props: {
    id: { required: true }
  },
  data() {
    return {
      model: ""
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`/articles/${this.id}`);
      this.model = res.data;
    }
  },
  created() {
    this.fetch();
  },
  watch: {
    id() {
      //监听id，当id变化，执行fetch
      // id:'fecth'
      this.fetch();
    }
  }
};
</script>
<style lang="scss">
.page-article {
  .icon-Back {
    font-size: 1.6923rem;
  }
  .body {
    img {
      max-width: 100%;
      height: auto;
    }
  }
  iframe {
    width: 100%;
    height: auto;
  }
}
</style>
