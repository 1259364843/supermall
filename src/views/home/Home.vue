<template>
  <div id="home">
    <!--  使用组件-->
    <NavBar class="home-nav">
      <div slot="center">购物街</div>
    </NavBar>
    <TabControl
      :titles="['流行', '新款', '精选']"
      class="tab-control"
      @tabClick="tabClick"
      ref="tabControl1"
      v-show="isTabFixed"
    >
    </TabControl>

    <Scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <HomeSwiper
        :banners="banners"
        @swiperImageLoad="swiperImageLoad"
      ></HomeSwiper>
      <RecommendView :recommends="recommends"></RecommendView>
      <FeatureView></FeatureView>
      <TabControl
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl2"
      >
      </TabControl>
      <GoodsList :goods="showGoods"></GoodsList>
    </Scroll>
    <!-- 返回顶部按钮   -->
    <BackTop @click.native="backClick" v-show="isShowBackTop"></BackTop>
  </div>
</template>

<script>
//  子组件
//  导入轮播图组件
import HomeSwiper from "./childComps/HomeSwiper";
//  导入推荐组件
import RecommendView from "./childComps/RecommendView";
// 导入
import FeatureView from "./childComps/FeatureView";
// 导入商品列表
import GoodsList from "components/content/goods/GoodsList";
//  返回顶部
import BackTop from "components/content/backtop/BackTop";

//  公共组件
//  导入导航栏组件
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
//  滚动组件
import Scroll from "components/common/scroll/Scroll";

//  导入网络请求
import { getHomeMultidata, getHomeGoods } from "network/home";
import { debounce } from "common/utils";
import {BACK_POSITION} from "common/const";
import {itemListenerMixin, backTopMixin} from "common/mixin";

export default {
  name: "Home",
  components: {
    //注册组件
    HomeSwiper,
    RecommendView,
    FeatureView,
    GoodsList,
    NavBar,
    TabControl,
    Scroll,
  },
  mixins: [itemListenerMixin, backTopMixin],
  data() {
    return {
      banners: [],
      recommends: [],
      //  商品数据
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      //默认选择的类型
      currentType: "pop",
      bs: null,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
    };
  },
  computed: {
    //通过计算属性来获取不同类型的商品数据
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  //  生命周期函数
  created() {
    //  1.请求多个数据
    this.getHomeMultidata();
    //  2.请求商品数据,只需要传类型
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    console.log('Home组件mounted');
  },
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
    // 刷新一次
    this.$refs.scroll.refresh();
  },
  deactivated() {
    //  1.保存坐标y的值
    this.saveY = this.$refs.scroll.getScrollY();
    //  2.取消全局事件的监听
    this.$bus.$off('itemImgLoad', this.itemImgListener);
  },
  methods: {
    //1.事件监听相关方法

    //
    tabClick(index) {
      //根据index来决定是点击了哪一个项目
      console.log(index);
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    // 监听滚动
    contentScroll(position) {
      // 1.监听BackTop是否显示
      this.isShowBackTop = -position.y > BACK_POSITION;
      // 2.决定tabControl是否吸顶
      this.isTabFixed = -position.y > this.tabOffsetTop;
    },
    // 上拉加载更多数据
    loadMore() {
      this.getHomeGoods(this.currentType);
    },
    // 轮播图图片加载完成
    swiperImageLoad() {
      // tabOffsetTop的值取决于tabControl2的offsetTop
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },
    //2.网络请求相关方法
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        // console.log(res);
        //将返回的数据push到对应的数组中去
        this.goods[type].list.push(...res.data.list);
        //  页码加一
        this.goods[type].page += 1;
        // 结束上拉加载行为
        this.$refs.scroll.finishPullUp();
      });
    },

    // //  返回顶部
    // backClick() {
    //   // this.$refs.scroll)拿到的是Scroll组件
    //   // console.log(this.$refs.scroll);
    //   this.$refs.scroll.scrollTo(0, 0, 500);
    // },
  },
};
</script>

<style scoped>
#home {
  /*padding-top: 44px;*/
  height: 100vh;
  position: relative;
}

.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  /* z-index: 1; */
}

.content {
  /* 绝对定位 */
  position: absolute;
  overflow: hidden;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

.tab-control {
  position: relative;
  z-index: 9;
}
</style>
