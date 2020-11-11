<template>
  <div id="app">
    <div class="header">
      <navbar></navbar>
    </div>
    <div style="padding-top: 60px">
      <router-view></router-view>
    </div>
    <!-- 页脚 -->
    <div class="footer">
      <p>
        <span> Copyright </span>
        <span>©</span>
        <span> 2020 </span>
        <span>By </span>
        <a @click="">Snowiest</a>
      </p>
      <p>
        友情链接:
        <a
          v-for="blogroll in blogrollList"
          :href="'http://' + blogroll.link"
          target="_blank"
          >{{ blogroll.name }}&nbsp;&nbsp;</a
        >
      </p>
      <p>
        <a href="#" target="_blank">暂无备案</a>
      </p>
    </div>
  </div>
</template>

<script>
import navbar from "./components/navbar/navbar.vue";
import api from "./config/api.js";

export default {
  name: "App",
  components: {
    navbar,
  },
  data() {
    return {
      navList: [],
      blogrollList: [], //友情链接
    };
  },
  created: function () {
    //渲染友情链接
    api
      .getBlogrollList()
      .then((res) => {
        if (api.check(res.data)) {
          this.blogrollList = res.data.data;
        } else {
          console.log("渲染友情链接出错：" + res.data.msg);
        }
      })
      .catch((err) => {
        console.log("获取友情链接列表出错");
        console.error(err);
      });
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

html,
body {
  width: 100%;
  height: 100%;
}

body {
  background-color: #f5f5f5;
}

#app {
  height: 100%;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  color: #333;
}

.header {
  width: 100%;
}

/* 页脚，网站信息 */
.footer {
  padding: 2% 10%;
  position: relative;
  bottom: 0;
  margin: 50px 20px 0px;
  border-top: 1px solid #eee;
  text-align: center;
  color: #777;
}

.footer p {
  margin-top: 10px;
  font-size: 12px;
  font-weight: 300;
}

.footer p a {
  text-decoration: none;
  color: #777;
}

.footer p a:hover {
  color: #333;
}
</style>
