<template>
  <div class="content-item" :class="[previewing ? 'preview' : 'viewing']">
    <div class="item-header">
      <div style="float: right" v-show="!previewing">
        <a @click="shrink">
          <i class="icon icon-shrink"></i>
        </a>
      </div>
    </div>
    <div class="item-content">
      <div class="item-cover" :class="{ 'item-left': previewing }">
        <img :src="article.cover" alt="" />
      </div>
      <div class="item-info" :class="{ 'item-right': previewing }">
        <div class="item-title">
          <a @click="stretch">
            <h1>{{ article.title }}</h1>
          </a>
          <p>
            {{ article.summary }}
            <a v-show="previewing" style="cursor: pointer">......</a>
          </p>
          <div v-show="!previewing" style="margin: 30px 0px 20px">
            <article-view :content="article.content"></article-view>
          </div>
        </div>
      </div>
    </div>
    <div class="item-foot">
      <span class="article-copyright">
        <i class="icon icon-time"> 2020-10-12 </i>
        &nbsp;
        <i class="icon icon-author">
          {{ article.author }}
        </i>
      </span>
      <span class="article-taglist">
        <a
          v-for="tag in article.tags"
          :key="tag.name"
          :title="tag.desc"
          class="tag"
        >
          {{ tag.name }}
        </a>
      </span>
      <span class="article-info">
        <a class="info-a">
          <i class="icon-thumbup">{{ article.like }}</i>
        </a>
        &nbsp;
        <a class="info-a">
          <i class="icon-eye">{{ article.eye }}</i>
        </a>
        &nbsp;
        <a class="info-a">
          <i class="icon-comment">{{ article.comment }}</i>
        </a>
      </span>
    </div>
  </div>
</template>

<script>
import articleView from "./article-view";

export default {
  components: {
    articleView,
  },
  props: {
    article: Object,
    required: true,
  },
  name: "article-card",
  data() {
    return {
      value: "",
      previewing: true,
    };
  },
  methods: {
    stretch() {
      this.previewing = false;
    },
    shrink() {
      this.previewing = true;
    },
  },
};
</script>

<style scoped>
/* 图标 */
.icon {
  line-height: 20px;
  vertical-align: middle;
  text-align: center;
}

.icon-shrink::before {
  content: "";
  display: inline-block;
  width: 25px;
  height: 25px;
  background-image: url("../assets/img/icon/shrink.svg");
  background-position: center;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  cursor: pointer;
}

.icon-author::before {
  content: "";
  display: inline-block;
  width: 15px;
  height: 15px;
  background-image: url("../assets/img/icon/author.svg");
  background-position: center;
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

.icon-time::before {
  content: "";
  display: inline-block;
  width: 15px;
  height: 15px;
  background-image: url("../assets/img/icon/time.svg");
  background-position: center;
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

.icon-thumbup::before {
  content: "点赞 ";
}

.icon-eye::before {
  content: "阅读 ";
}

.icon-comment::before {
  content: "评论 ";
}

/* 项目 */
.content-item a:link,
.content-item a:hover {
  text-decoration: none;
}

.content-item {
  margin: 20px;
  padding: 15px 15px 5px 15px;
  transition: all 0.4s ease;
  background-color: #fff;
  border-left: 6px solid transparent;
  box-shadow: 0 0.1rem 0.2rem rgba(0, 0, 0, 0.05);
  overflow: hidden;
  caret-color: transparent;
}

.item-header {
  background: tomato;
}

.preview:hover {
  transform: scale(1.05, 1.05);
  border-left-color: skyblue;
  box-shadow: 10px 20px 80px rgba(0, 0, 0, 0.2);
}

.viewing {
  height: 80%;
  position: fixed;
  left: 0;
  top: 0;
  margin-top: 70px;
  overflow: auto;
  z-index: 999;
}

/* 左侧图片 */
.item-left {
  display: inline-block;
  width: 30%;
  /* float: left; */
}

.item-cover img {
  width: 100%;
  height: auto;
}

/* 右侧内容 */
.item-right {
  width: 66.6%;
  float: right;
}

.item-right p {
  margin-top: 15px;
  font-size: 13px;
}

.item-right p,
.item-right p * {
  word-break: break-all;
  color: #888;
}

.item-right .item-title a h1 {
  margin: 0px;
  font-size: 22px;
  line-height: unset;
  cursor: pointer;
  text-align: unset;
}

.item-title a h1 {
  margin: 20px 0px;
  color: #666;
  font-size: 40px;
  text-align: center;
  transition: all 0.4s ease;
}

.item-title a h1:hover {
  color: purple;
}

.item-foot {
  padding: 10px 0;
}

.article-copyright {
  color: #9d9d9d;
}

.article-copyright i {
  font: Georgia;
  font-size: 14px;
  text-rendering: auto;
  text-decoration: none;
  color: black;
}

.article-taglist {
  margin-left: 30px;
}

.article-taglist .tag {
  margin: 5px 2px;
  padding: 2px;
  font-size: 12px;
  color: #fff;
  background-color: gray;
  border-radius: 2px;
  transition: all 0.4s ease;
}

.article-taglist .tag:hover {
  color: #eee;
}

.article-taglist .tag::before {
  content: "·";
}

.article-info {
  float: right;
}

.article-info i {
  font-style: normal;
}

.article-info .info-a {
  display: inline-block;
  font: normal normal normal 14px/1 "New Century Schoolbook";
  font-size: 14px;
  text-rendering: auto;
  text-decoration: none;
  color: black;
}
</style>
