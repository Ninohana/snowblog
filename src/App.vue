<template>
  <div id="app">
    <div class="header">
      <navbar :navList="navList"></navbar>
    </div>
    <div class="content" style="padding-top: 60px;">
      <article-card v-for="article in articleList" :key="article.id" :article="article"></article-card>
      <h1 v-if="articleList.length==0" style="margin-top: 100px;color: #777777;text-align: center;">没有数据！</h1>
      <div v-else class="content-pager">
        <ul class="pager">
          <li id="first">
            <a @click="firstPage" :class="{ disabled: currentPage==1 }" onselectstart="return false;">
              <i>
                首页
              </i>
            </a>
          </li>
          <li id="last">
            <a @click="lastPage" :class="{ disabled: currentPage==pages }" onselectstart="return false;">
              <i>
                末页
              </i>
            </a>
          </li>
          <li id="previous">
            <a @click="previousPage" :class="{ disabled: currentPage==1 }" onselectstart="return false;">
              上一页
            </a>
          </li>
          <li id="next">
            <a @click="nextPage" :class="{ disabled: currentPage==pages }" onselectstart="return false;">
              下一页
            </a>
          </li>
          <li>
            <a :class="{ disabled: pages==1 }" style="border-radius: 8px;" onselectstart="return false;">
              Page {{ currentPage }} / {{ pages }}
            </a>
          </li>
        </ul>
      </div>
    </div>
    <!-- 页脚 -->
    <div class="footer">
      <p>
        <span> Copyright </span>
        <span>©</span>
        <span> 2020 </span>
        <span>By </span>
        <a href="/">Snowiest</a>
      </p>
      <p>
        友情链接:
        <a v-for="blogroll in blogrollList" :href="'http://'+blogroll.link" target="_blank">{{ blogroll.name }}&nbsp;&nbsp;</a>
      </p>
      <p>
        <a href="#" target="_blank">暂无备案</a>
      </p>
    </div>

    <!-- <router-view /> -->
  </div>
</template>

<script>
  import config from '@/config/blog.json'
  import navbar from './components/navbar.vue'
  import Axios from 'axios'
  import articleCard from './components/article-card.vue'

  export default {
    name: 'App',
    components: {
      navbar,
      articleCard
    },
    data() {
      return {
        navList: [],
        blogrollList: [], //友情链接
        articleList: [],
        currentPage: 1,
        pages: 10
      }
    },
    created: function() {
      //渲染导航栏
      this.navList = config.nav.navList;
      this.navList.forEach(item => {
        // 这里因为webpack的图片打包的原因，需要重新require一下图片的地址进行加载
        item.icon = require('./' + item.icon)
      });

      //渲染页面数据
      this.getData();

      //渲染友情链接
      var api = "api/blogroll";
      Axios.get(api).then(res => {
        if (res.data.code == 200) {
          this.blogrollList = res.data.data;
        } else {
          console.log("友链加载失败|" + res.data.msg);
        }
      }).catch(err => {
        console.error(err);
      });
    },
    methods: {
      firstPage() {
        this.currentPage = 1;
      },
      lastPage() {
        this.currentPage = this.pages;
      },
      nextPage() {
        this.currentPage < this.pages ? this.currentPage++ : this.currentPage;
      },
      previousPage() {
        this.currentPage > 1 ? this.currentPage-- : this.currentPage;
      },
      getData(a, p) {
        var api = 'api/article';
        Axios.get(api).then(res => {
          this.articleList = res.data.data;
        }).catch(error => {
          console.error(error.message);
        })
      },
    },
    watch: {
      currentPage: function(n, o) {
        console.log("即将渲染第 " + n + " 页的数据");
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
    padding: 2% 10% 0 10%;
  }

  /* 翻页 */
  .content-pager {
    margin: -5px 20px 10px;
  }

  .content-pager ul,
  .content-pager li {
    list-style: none;
  }

  .pager {
    text-align: center;
  }

  .pager i {
    font-style: normal;
  }

  .pager li {
    display: inline;
  }

  .pager li a {
    margin: 0px 1px;
    padding: 5px 10px;
    text-decoration: none;
    color: #333;
    border-radius: 10px;
    background-color: transparent;
    cursor: default;
    user-seletct: none;
    transition: all .4s ease;
  }

  .pager li a:hover {
    background-color: #fff;
  }

  .pager li a.disabled {
    color: #888;
    background-color: #e5e5e5
  }

  #first,
  #previous {
    float: left;
  }

  #last,
  #next {
    float: right;
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
