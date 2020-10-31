<template>
  <div class="content-pager">
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
</template>

<script>
  export default {
    props: {
      pages: {
        type: Number,
        required: true
      },
      pageChange: {
        required: false
      }
    },
    data() {
      return {
        currentPage: 1,
      }
    },
    name: "pager",
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
      }
    },
    watch: {
      currentPage: function(n, o) {
        this.pageChange(n, o);
      }
    }
  }
</script>

<style scoped>
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
</style>
