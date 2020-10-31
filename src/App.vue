<template>
  <div id="app">
    <div class="header">
      <navbar></navbar>
    </div>
    <div class="content" style="padding-top: 60px;">
      <article-card v-for="article in articleList" :key="article.id" :article="article"></article-card>
      <h1 v-if="articleList.length==0" style="margin-top: 100px;color: #777777;text-align: center;">没有数据！</h1>
      <pager v-else :pages="pages" :pageChange="pageChange"></pager>
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
        <a v-for="blogroll in blogrollList" :href="'http://'+blogroll.link" target="_blank">{{ blogroll.name }}&nbsp;&nbsp;</a>
      </p>
      <p>
        <a href="#" target="_blank">暂无备案</a>
      </p>
    </div>
  </div>
</template>

<script>
  import navbar from './components/navbar/navbar.vue'
  import Axios from 'axios'
  import articleCard from './components/article-card.vue'
  import pager from './components/pager.vue'

  var API = {
    amount: 5,
    check: function(data) {
      const REQUEWST_SUCCESS = 200;
      if (data.code == REQUEWST_SUCCESS) {
        return true;
      } else {
        return false;
      }
    },
    getArticleList: function(p) {
      var url = 'api/article?amount=' + this.amount + "&page=" + (p || 1);
      return Axios.get(url);
    },
    getBlogrollList: function() {
      var url = "api/blogroll";
      return Axios.get(url);
    },
  }

  export default {
    name: 'App',
    components: {
      navbar,
      articleCard,
      pager
    },
    data() {
      return {
        amount: 5,
        pages: 2,
        navList: [],
        blogrollList: [], //友情链接
        articleList: []
      }
    },
    created: function() {
      //渲染页面数据
      API.getArticleList(1).then(res => {
        if (API.check(res.data)) {
          this.articleList = res.data.data;
        } else {
          console.log("获取文章出错：" + res.data.msg);
        }
      }).catch(err => {
        console.log("获取文章出错");
        console.error(err);
      });
      //渲染分页
      var api = "api/articles?amount=" + this.amount;
      Axios.get(api).then(res => {
        if (res.data.code == 200) {
          this.pages = res.data.data;
        } else {
          console.log("获取文章列表出错：" + res.data.msg);
        }
      }).catch(err => {
        console.log("获取文章列表出错");
        console.error(err);
      })

      //渲染友情链接
      API.getBlogrollList().then(res => {
        if (API.check(res.data)) {
          this.blogrollList = res.data.data;
        } else {
          console.log("渲染友情链接出错：" + res.data.msg);
        }
      }).catch(err => {
        console.log("获取友情链接列表出错")
        console.error(err);
      });
    },
    methods: {
      pageChange(n, o) {
        API.getArticleList(n).then(res => {
          if (API.check(res.data)) {
            this.articleList = res.data.data;
          } else {
            console.log("获取文章出错：" + res.data.msg);
          }
        }).catch(err => {
          console.log("获取文章出错");
          console.error(err);
        });
      }
    }
  }
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

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    color: #333;
    background-color: #f5f5f5;
  }

  .header {
    width: 100%;
  }

  /* 内容 */
  .content {
    padding: 2% 20% 0 20%;
  }



  /* 页脚，网站信息 */
  .footer {
    padding: 2% 10%;
    position: relative;
    bottom: 0;
    margin: 65px 20px 0px;
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
