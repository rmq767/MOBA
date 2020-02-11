## 知识点及难题

### 通用 CRUD 接口

**通用 CRUD 接口，就是后台通过前端的 URL，动态获取到里面的需要的参数，将参数处理成我们的 DB 模型接口，就可以使用了**

#### 1.改造接口，形成动态接口

```js
// 改造前
const express = require("express");
const router = express.Router();
const Category = require("../models/Category");
router.get("/categories", async (req, res) => {
  let result = await Category.create(req.body);
  res.send(result);
});

// 改造后
const express = require("express");
const router = express.Router({
  mergeParams: true //合并url参数，获取url传的{:resource}
});
router.get("/", async (req, res) => {
  let Model = require(`../../models/${req.params.resource}`);
  res.send(result);
});
app.use("/admin/api/rest/:resource", router);
```

==改造后的请求接口==
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200202191923236.png)会报错![在这里插入图片描述](https://img-blog.csdnimg.cn/20200202190255305.png)
==因为我们拿到的是 categories==，但是我们要的是 Category。

#### 2.处理接口参数

- npm i inflection(处理格式的插件)，这里我们要拿到**Category**，因为我们 model 定义的是**Category**。
  ![-](https://img-blog.csdnimg.cn/20200202192524149.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ0Nzc1Nzgy,size_16,color_FFFFFF,t_70) -下面是获取 **Category**

```js
const modelName = require("inflection").classify(req.params.resource); //复数转单数，首字母大写
res.send(modelName);
req.Model = require(`../../models/${modelName}`); //req.Model表示给请求对象上加上Model，之后的req都可以引用
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200202191013748.png)

- **为了避免给每个接口添加这两句，所以要在 app.use()中使用中间件**

```javascript
// 通用CRUD接口
app.use(
  "/admin/api/rest/:resource",
  async (req, res, next) => {
    const modelName = require("inflection").classify(req.params.resource); //复数转单数，首字母大写
    req.Model = require(`../../models/${modelName}`); //req.Model表示给请求对象上加上Model，之后的req都可以引用
    next();
  },
  router
);
```

#### 改造完成

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200202191747256.png)
之后我们就可以通过**Request URL**，进行通用的增删改查，大大简化代码。

### 封装组件

### **会用到的知识**

- 父组件向子组件传值
- slot 插槽

##### 我想要做一个这样的组件

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200203153357958.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ0Nzc1Nzgy,size_16,color_FFFFFF,t_70)

- 头部基本不变，只需要改变图标和标题
- 下面的内容需要我们改变，可以是视频、资料、新闻等。

#### 1.先定义一个 Card.vue 的组件

接收父组件动态传过来的图标和标题

```javascript
<template>
  <div>
    <!-- card -->
    <div class="card p-3 mt-3 bg-white">
      <div class="card-header d-flex pb-3">
        <!-- 图标 -->
        <i class="iconfont" :class="`icon-${icon}`"></i>
        <!-- 标题 -->
        <div class="fs-xl flex-1 ml-2">{{ title }}</div>
        <i class="iconfont icon-menu"></i>
      </div>
      <div class="card-body pt-3">
      <!-- slot用来接收之后的自己定义的内容，就是下面body的内容 -->
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {//父组件传来的值
    title: { type: String, required: true },
    icon: { type: String, required: true }
  },
</script>
```

==记得把组件挂载到**main.js**上，方便全局引用==

```javascript
import Card from "./components/Card";
Vue.component("m-card", Card);
```

#### 2.再定义一个，CardList.vue 组件

接收父组件传过来列表的数据，进行展示。并把图标和标题传给 Card.vue。

```javascript
<template>
  <div>
    <m-card :icon="icon" :title="title">
      <div class="body">
        <!-- 导航栏 -->
        <div class="nav pt-3 jc-between">
          <div
            class="nav-item"
            :class="{active:active===index}"
            v-for="(category,index) in categories"
            :key="index"
            @click="active = index"
          >
            <div class="nav-link">{{category.name}}</div>
          </div>
        </div>
        <!-- 轮播图 -->
        <div class="pt-2">
          <swiper>
            <swiper-slide v-for="(category,index) in categories" :key="index">
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
    categories: { type: Array, require: true }//这是父组件传的列表数据，是个数组
  },
  data() {
    return {
      active: 0
    };
  },
};
</script>
```

==再挂载到**main.js**上，方便全局引用==

```javascript
import ListCard from "./components/ListCard";
Vue.component("m-list-card", ListCard);
```

**注意：这两个组件的 slot 各自的作用**

#### 3.父组件传值

```javascript
    <!-- 卡片组件 -->
    <m-list-card title="新闻资讯" icon="menu1" :categories="newsCat">
      <template v-slot:items="{ category }">
        <div
          v-for="(item, index) in category.newsList"
          :key="index"
          class="py-2"
        >
          <span>[{{ item.categoryName }}]</span>
          <span>|</span>
          <span>{{ item.title }}</span>
          <span>{{ item.date }}</span>
        </div>
      </template>
    </m-list-card>

    //列表数据
      newsCat: [
        {
          name: "热门",
          newsList: new Array(5).fill({}).map(() => ({
            categoryName: "公告",
            title: "这是一条广告",
            date: "06/01"
          }))
        },
        {
          name: "新闻",
          newsList: new Array(5).fill({}).map(() => ({
            categoryName: "新闻",
            title: "这是一条广告",
            date: "06/01"
          }))
        },
        {
          name: "活动",
          newsList: new Array(5).fill({}).map(() => ({
            categoryName: "活动",
            title: "这是一条广告",
            date: "06/01"
          }))
        },
        {
          name: "赛事",
          newsList: new Array(5).fill({}).map(() => ({
            categoryName: "赛事",
            title: "这是一条广告",
            date: "06/01"
          }))
        }
      ]
```

父组件需要传 3 个值`<m-list-card title="新闻资讯" icon="menu1" :categories="newsCat">`。

- 父组件传（**title="新闻资讯" icon="menu1" :categories="newsCat"**）==> _CardList.vue_（**props**）接收
- _CardList.vue_（**title="新闻资讯" icon="menu1"**）==> _Card.vue_（**props**）接收展示
- _CardList.vue_（**:categories="newsCat"**）v-for 循环展示，但是为了复用性，我们需要把`<slot name="items" :category="category"></slot>`里面的数据传给父组件，让父组件展示来。
- 最后父组件通过`<template v-slot:items="{ category }">`拿到**CardList.vue**传过来的列表数据，进行循环展示。==v-slot:items==是用来绑定 slot 的==name==，数据则是==category==
- **注意**：每个子组件的==slot==的用处，和父组件的==template==用处
