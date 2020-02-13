<template>
  <div>
    <!-- card -->
    <div class="card p-3 mt-3 bg-white">
      <div
        class="card-header d-flex"
        :class="{ 'border-bottom': !plain, 'pt-3': !plain }"
      >
        <!-- 图标 -->
        <i class="iconfont" :class="`icon-${icon}`"></i>
        <!-- 标题 -->
        <div class="fs-xl flex-1 ml-2">
          <strong>{{ title }}</strong>
        </div>
        <i class="iconfont icon-menu" v-if="!plain"></i>
      </div>
      <div class="card-body pt-3">
        <!-- slot用来接收之后的自己定义的内容 -->
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: { type: String, required: true },
    icon: { type: String, required: true },
    plain: { type: Boolean }
  },
  data() {
    return {};
  },

  methods: {},

  components: {},

  computed: {},

  created() {}
};
</script>
<style lang="scss">
@import "../assets/css/_variables";
.card {
  border-bottom: 1px solid $border-color;
}
</style>
