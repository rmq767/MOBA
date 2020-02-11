<template>
  <div>
    <m-card :icon="icon" :title="title">
      <div class="body">
        <!-- 导航栏 -->
        <div class="nav pt-3 jc-between">
          <div
            class="nav-item"
            :class="{ active: active === index }"
            v-for="(category, index) in categories"
            :key="index"
            @click="$refs.list.swiper.slideTo(index)"
          >
            <div class="nav-link">{{ category.name }}</div>
          </div>
        </div>
        <!-- 轮播图 -->
        <div class="pt-2">
          <swiper
            :options="{ autoHeight: true }"
            ref="list"
            @slide-change="() => (active = $refs.list.swiper.realIndex)"
          >
            <swiper-slide v-for="(category, index) in categories" :key="index">
              <!-- slot接收显示的列表数据，这里要用具名的solt父组件需要拿到category这个值 -->
              <slot name="items" :category="category"></slot>
            </swiper-slide>
          </swiper>
        </div>
      </div>
    </m-card>
  </div>
</template>

<script>
export default {
  props: {
    title: { type: String, require: true },
    icon: { type: String, require: true },
    categories: { type: Array, require: true }
  },
  data() {
    return {
      active: 0
    };
  }
};
</script>
<style scoped></style>
