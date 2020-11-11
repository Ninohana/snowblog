<template>
  <div class="article-editor">
    <div class="editor-header">
      <div>
        <!-- 标题： -->
        <input
          type="text"
          class="article-title"
          :v-model="title"
          placeholder="文章标题"
        />
        <!-- 简介： -->
        <input
          type="text"
          class="article-summary"
          :v-model="summary"
          placeholder="文章简介"
        />
      </div>
    </div>
    <div class="editor-content">
      <mavon-editor
        :toolbars="toolbars"
        v-model="value"
        @imgAdd="handleEditorImgAdd"
        @imgDel="handleEditorImgDel"
        @change="onChange"
        @save="onSave"
        ref="md"
      />
    </div>
    <div class="editor-footer"></div>
  </div>
</template>

<script>
import Vue from "vue";
import mavonEditor from "mavon-editor";
import "mavon-editor/dist/css/index.css";
import api from "../config/api.js";

Vue.use(mavonEditor);

export default {
  name: "articleEditor",
  computed() {
    return {
      value: "",
      toolbars: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: false, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: false, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: true, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: true, // 导航目录
        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        /* 2.2.1 */
        subfield: true, // 单双栏模式
        preview: true, // 预览
      },
    };
  },
  data() {
    return {
      title: "",
      summary: "",
    };
  },
  methods: {
    handleEditorImgAdd(e) {
      console.log(e);
    },
    handleEditorImgDel(e) {
      console.log(e);
    },
    onChange(e) {
      console.log(e);
    },
    onSave(e) {
      api
        .uploadArticle(
          "https://s1.ax1x.com/2020/10/29/BJSQPg.jpg",
          "我是标题",
          "我是简介",
          "我是作者",
          "",
          this.value
        )
        .then((res) => {
          console.log(res);
          alert(res.data.msg);
        })
        .catch((err) => {
          console.log("上传失败");
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* 内容 */
.article-editor {
  padding: 2% 10% 0 10%;
  /* min-height: 450px; */
}

.editor-header input,
.editor-header textarea {
  /* 取消默认样式 */
  background: none;
  outline: none;
  border: none;

  width: 99.2%;
  padding-left: 10px;
  border-radius: 5px;
  background-color: #fff;
}

.article-title {
  margin-bottom: 10px;
  line-height: 60px;
  font-size: 26px;
  color: #333;
}

.article-summary {
  margin-bottom: 15px;
  line-height: 50px;
  font-size: 20px;
  color: #555;
}
</style>
