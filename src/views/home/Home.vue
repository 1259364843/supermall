<template>
<div id="home">
  <!--  使用组件-->
  <NavBar class="home-nav">
    <div slot="center">购物街</div>
  </NavBar>
  <HomeSwiper :banners="banners"></HomeSwiper>
  <RecommendView :recommends="recommends"></RecommendView>
</div>
</template>

<script>
//  导入导航栏组件
import NavBar from "components/common/navbar/NavBar";
//  导入轮播图组件
import HomeSwiper from "./childComps/HomeSwiper";
//  导入推荐组件
import RecommendView from "./childComps/RecommendView";

import {getHomeMultidata} from "../../network/home";

export default {
  name: "Home",
  components: {
    //注册组件
    NavBar,
    HomeSwiper,
    RecommendView
  },
  data () {
    return {
      banners: [],
      recommends: []
    }
  },
  //  生命周期函数
  created() {
  //  1.请求多个数据
    getHomeMultidata().then(res => {
      // console.log(res);
      this.banners = res.data.banner.list;
      this.recommends = res.data.recommend.list;
    })
  }
}
</script>

<style scoped>
  .home-nav {
    /*使用在base.css中设置的css变量*/
    background-color: var(--color-tint);
    color: white;
  }

</style>
