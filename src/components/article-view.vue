<template>
  <div class="article-view">
    <mavon-editor
      :value="content"
      class="md"
      :subfield="prop.subfield"
      :defaultOpen="prop.defaultOpen"
      :toolbarsFlag="prop.toolbarsFlag"
      :editable="prop.editable"
      :scrollStyle="prop.scrollStyle"
    />
  </div>
</template>

<script>
import Vue from "vue";
import mavonEditor from "mavon-editor";
import "mavon-editor/dist/css/index.css";
import Api from "../config/api.js";

Vue.use(mavonEditor);

export default {
  props: {
    content: String,
    required: true,
  },
  name: "article-view",
  computed: {
    prop() {
      return {
        subfield: false,
        defaultOpen: "preview",
        editable: false,
        toolbarsFlag: false,
        scrollStyle: true,
      };
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* 内容 */
</style>
