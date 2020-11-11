<template>
  <div class="content">
    <article-card v-for="article in articleList" :key="article.id" :article="article"></article-card>
    <h1 v-if="articleList.length == 0" style="margin-top: 100px; color: #777777; text-align: center">
      暂无数据
    </h1>
    <pager v-else :pages="pages" :pageChange="pageChange"></pager>
  </div>
</template>

<script>
  import articleCard from "./article-card.vue";
  import pager from "./pager.vue";
  import api from "../config/api.js";

  export default {
    name: "article",
    components: {
      articleCard,
      pager,
    },
    data() {
      return {
        articleList: [],
        pages: 1,
        amount: 5,
      };
    },
    created() {
      api
        .getArticleList(this.pages, this.amount)
        .then((res) => {
          if (api.check(res.data)) {
            this.articleList = res.data.data;
          } else {
            console.log("获取文章出错：" + res.data.msg);
          }
        })
        .catch((err) => {
          console.log("获取文章出错");
          console.error(err);
        });

      api
        .getArticleCount()
        .then((res) => {
          if (api.check(res.data)) {
            this.pages = Math.ceil(res.data.data / this.amount);
          } else {
            console.log("获取文章数量出错：" + res.data.msg);
          }
        })
        .catch((err) => {
          console.log("获取文章数量出错");
          console.error(err);
        });
    },
    methods: {
      pageChange(n, o) {
        api
          .getArticleList(n, this.amount)
          .then((res) => {
            if (api.check(res.data)) {
              this.articleList = res.data.data;
            } else {
              console.log("获取文章出错：" + res.data.msg);
            }
          })
          .catch((err) => {
            console.log("获取文章出错");
            console.error(err);
          });
      },
    },
  };
</script>

<style>
  /* 内容 */
  .content {
    padding: 0 20%;
  }
</style>
