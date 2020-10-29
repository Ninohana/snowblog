<template>
  <div class="header">
    <div class="navbar">
      <div class="navbar-logo navbar-left">
        <a href="#">
          <img src="../assets/logo.svg" alt="">
          Snowiest的博客
        </a>
      </div>
      <div class="navbar-nav navbar-left">
        <ul>
          <li v-for="item in navList">
            <a :href="item.href" class="nav-item">
              <img :src="item.icon" alt="" class="nav-icon">
              {{ item.name }}
            </a>
          </li>
        </ul>
      </div>

      <div class="navbar-nav navbar-right">
        <ul>
          <li>
            <a href="#" class="nav-item" disabled style="color: #888;">
              Sign in
            </a>
          </li>
          <li>
            <a href="#" class="nav-item" disabled style="color: #888;">
              注册
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    props: {
      navList: {

      }
    },
    name: "navbar"
  }
</script>

<style scoped>
  * {
    margin: 0;
    padding: 0;
  }

  html,
  body {
    width: 100%;
    height: 100%;
  }

  .header {
    width: 100%;
  }

  .navbar {
    width: 100%;
    height: 60px;
    min-height: 60px;
    position: fixed;
    background-color: #fff;
    z-index: 9;
  }

  .navbar-left {
    float: left;
  }

  .navbar-right {
    float: right;
  }

  .navbar img {
    vertical-align: middle;
  }

  .navbar-logo {
    margin-right: 30px;
  }

  .navbar-logo a {
    display: block;
    height: 60px;
    text-decoration: none;
    color: silver;
  }

  .navbar-logo a img {
    width: auto;
    height: 60px;
  }

  .navbar-nav ul,
  .navbar-nav li {
    list-style: none;
  }

  .navbar-nav li {
    float: left;
  }

  .navbar-nav .nav-item {
    display: block;
    height: 60px;
    line-height: 60px;
    padding: 0 15px;
  }

  .nav-item,
  .nav-item:focus,
  .nav-item:visited,
  .nav-item:link {
    text-decoration: none;
    color: #333;
  }

  .nav-icon {
    width: 20px;
    height: 20px;
  }
</style>
