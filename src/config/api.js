'use strict'
import Axios from 'axios';


const REQUEWST_SUCCESS = 200;

const AMOUNT = 5;
const PAGE = 1;

function check(data) {
  if (data.code == REQUEWST_SUCCESS) {
    return true;
  } else {
    return false;
  }
}

function getArticleList(p, a) {
  let url = 'api/article?amount=' + (a || AMOUNT) + "&page=" + (p || PAGE);
  return Axios.get(url);
}

function getBlogrollList() {
  let url = "api/blogroll";
  return Axios.get(url);
}

function getArticleCount(amount) {
  amount = amount || AMOUNT;
  //渲染分页
  let url = "api/articles?amount=" + amount;
  return Axios.get(url);
}

function uploadArticle(cover, title, summary, author, tags, content) {
  let url = "api/article";
  let data = new FormData();
  data.append("cover", cover);
  data.append("title", title);
  data.append("summary", summary);
  data.append("author", author);
  data.append("tags", tags);
  data.append("content", content);
  return Axios.post(url, data, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
}

function getArticleDetail(id) {
  let url = "api/article/" + id
  return Axios.get(url);
}

export default {
  check, //检查接口返回
  getArticleList, //取文章列表
  getBlogrollList, //取友情链接列表
  getArticleCount, //取文章数量
  getArticleDetail, //取文章
  uploadArticle, //上传文章
}
