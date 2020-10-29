<template>
  <div id="app">
    <div class="header">
      <navbar :navList="navList"></navbar>
    </div>
    <div class="content" style="padding-top: 60px;">
      <!-- <article-card v-for="article in blog" :article="article"></article-card> -->
      <article-card :article="getData()"></article-card>
      <div class="content-pager">
        <ul class="pager">
          <li id="first">
            <a href="#" @click="getData">
              <i>
                首页
              </i>
            </a>
          </li>
          <li id="last">
            <a href="">
              <i>
                末页
              </i>
            </a>
          </li>
          <li id="previous">
            <a href="">
              上一页
            </a>
          </li>
          <li id="next">
            <a href="">
              下一页
            </a>
          </li>
          <li>
            <a href="#" style="border-radius: 8px;">
              Page 2 / 4
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
        <a v-for="link in blogroll" :href="'http://'+link.link" target="_blank">{{ link.name }}&nbsp;&nbsp;</a>
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
        blogroll: [],
        blog: [],
      }
    },
    created: function() {
      this.navList = config.nav.navList;
      this.navList.forEach(item => {
        // 这里因为webpack的图片打包的原因，需要重新require一下图片的地址进行加载
        item.icon = require('./' + item.icon)
      });

      this.blog = config.blog.articleList;

      this.blogroll = config.blogroll;
    },
    methods: {
      getData() {
        var api = 'api/article/1';
        Axios.get(api).then(res => {
          console.log(res);
        }).catch(error => {
          console.error(error.message);
        })
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
    padding: 5px 10px;
    text-decoration: none;
    color: #333;
    border-radius: 10px;
    background-color: transparent;
    transition: all .4s ease;
  }

  .pager li a:hover {
    background-color: #fff;
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
