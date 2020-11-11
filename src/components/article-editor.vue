<template>
  <div class="article-editor">
    <div class="editor-header">
      <div class="editor">
        <label for="title">文章标题：</label>
        <input
          id="title"
          type="text"
          :v-model="title"
          placeholder="此处输入文章标题"
        />
      </div>
      <div class="editor">
        <label for="summary">文章简介：</label>
        <input
          id="summary"
          type="text"
          :v-model="summary"
          placeholder="此处输入文章简介"
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
    <div class="editor-footer">
      <div class="editor">
        <label for="cover">封面链接：</label>
        <input
          id="cover"
          type="text"
          :v-model="cover"
          placeholder="此处填写封面链接"
        />
      </div>
      <div class="selector">
        文章标签：
        <select name="tag" id="tag">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
      </div>
      <div class="tbar">
        <a class="button" @click="submit">提交</a>
        <a class="button" @click="reset">清空</a>
      </div>
    </div>
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
      cover: "",
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
          this.cover,
          this.title,
          this.summary,
          "Admin",
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
    submit() {
      alert("submit!");
    },
    reset() {
      alert("reset!");
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

.editor {
  display: flex;
  width: 100%;
  padding: 1px 10px;
  border-radius: 2px;
  box-shadow: 1px 1px 5px #ddd;
  box-sizing: border-box;
  line-height: 50px;
  background-color: #fff;
}

.editor label {
  flex-shrink: 0; /* 挤压不变形 */
  font-weight: bold;
}

.editor input {
  /* 清除默认样式 */
  background: none;
  outline: none;
  border: none;
  /* 自适应组件宽度 */
  width: 100%;

  line-height: 50px;
  font-size: 16px;
  font-weight: 300;
  /* background: black; */
}

.editor-header div {
  margin-bottom: 10px;
}

.editor-footer div {
  margin-top: 10px;
}

.button {
  padding: 10px 100px;
  display: inline-block;
  border-radius: 10px;
  transition: all 0.2s ease;
  cursor: pointer;
  background-color: #fff;
}

.button:hover {
  background-color: #eee;
}

.tbar {
  display: flex;
  justify-content: space-between;
}
</style>
