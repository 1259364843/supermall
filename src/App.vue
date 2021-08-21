<template>
  <div id="app">
<!--    路由占位符-->
<!--    <keep-alive>-->

<!--    </keep-alive>-->
    <router-view></router-view>
    <!-- 底部tabbar组件   -->
    <MainTabBar></MainTabBar>
  </div>
</template>

<script>
//  引用tabbar组件
import MainTabBar from "components/content/mainTabBar/MainTabBar";

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
