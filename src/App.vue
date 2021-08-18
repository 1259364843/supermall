<template>
  <div id="app">
  <!-- 底部tabbar组件   -->
  <MainTabBar></MainTabBar>
<!--    路由占位符-->
    <router-view></router-view>
  </div>
</template>

<script>
//  引用tabbar组件
import MainTabBar from "components/content/MainTabBar/MainTabBar";

export default {
  name: 'App',
  components: {
    MainTabBar
  }
}
</script>

<style>
@import "assets/css/base.css";
</style>
