<template>
  <div>
    <h1>{{ id ? "编辑" : "新建" }}广告</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="广告">
        <el-button @click="model.items.push({})"
          ><i class="el-icon-plus"></i>添加广告</el-button
        ><!-- 点击添加按钮，就向items数组中添加一个空对象，用来存数据 -->
        <el-row type="flex" style="flex-wrap: wrap;">
          <!-- flex布局换行 -->
          <el-col v-for="(item, i) in model.items" :key="i">
            <div style="margin:1rem 5rem 1rem -5rem;">
              <el-form-item label="链接">
                <el-input v-model="item.url"></el-input>
              </el-form-item>
              <el-form-item label="图片" style="margin-top:1rem;">
                <el-upload
                  class="avatar-uploader"
                  :action="uploadUrl"
                  :headers="mixGetAuthHeaders()"
                  :show-file-list="false"
                  :on-success="res => $set(item, 'image', res.url)"
                >
                  <!-- res => $set(item, 'image', res.url)：将res.url赋值给item里面的image属性 -->
                  <img v-if="item.image" :src="item.image" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item>
                <el-button
                  size="small"
                  type="danger"
                  @click="model.items.splice(i, 1)"
                  style="margin-left:8rem;"
                  >删除</el-button
                >
              </el-form-item>
            </div>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: {}
  },
  data() {
    return {
      model: {
        name: "",
        items: []
      }
    };
  },

  methods: {
    async save() {
      if (this.id) {
        await this.$http.put(`/rest/ads/${this.id}`, this.model);
      } else {
        await this.$http.post("/rest/ads", this.model);
      }
      this.$router.push("/ads/list");
      this.$message({
        type: "success",
        message: "保存成功"
      });
    },
    async fetch() {
      let res = await this.$http.get(`/rest/ads/${this.id}`);
      this.model = Object.assign({}, this.model, res.data);
    }
  },

  components: {},

  computed: {},

  created() {
    this.id && this.fetch();
  }
};
</script>
