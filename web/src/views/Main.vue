<template>
  <div>
    <div class="topbar bg-black py-2 px-3 d-flex ai-center">
      <img src="../assets/logo.png" alt height="30" />
      <div class="px-2 flex-1">
        <div class="text-white">王者荣耀</div>
        <div class="text-grey-1 fs-xxs">团队成就更多</div>
      </div>
      <button class="btn bg-primary text-black" type="button">立即下载</button>
    </div>
    <div class="bg-primary py-3">
      <div class="nav nav-inverse jc-around">
        <div class="nav-item active">
          <router-link to="/" tag="div" class="nav-link">首页</router-link>
        </div>
        <div class="nav-item">
          <router-link to="/a" tag="div" class="nav-link">攻略中心</router-link>
        </div>
        <div class="nav-item">
          <router-link to="/b" tag="div" class="nav-link">赛事中心</router-link>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  props: [""],
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
.topbar {
  //吸顶效果
  position: sticky;
  top: 0;
  z-index: 999;
}
</style>
