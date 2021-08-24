<template>
<div id="detail">
  <DetailNavBar @titleClick="titleClick" ref="nav"></DetailNavBar>

  <Scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
    <DetailSwiper :top-images="topImages"></DetailSwiper>
    <DetailBaseInfo :goods="goods"></DetailBaseInfo>
    <DetailShopInfo :shop="shop"></DetailShopInfo>
    <DetailGoodsInfo :detail-info="detailInfo" @imageLoad="imageLoad"></DetailGoodsInfo>
    <DetailParams ref="params" :param-info="paramInfo"></DetailParams>
    <DetailCommentInfo ref="comment" :comment-info="commentInfo"></DetailCommentInfo>
    <GoodsList ref="recommend" :goods="recommends"></GoodsList>
    <h2>{{iid}}</h2>
  </Scroll>
  <BackTop @click.native="backClick" v-show="isShowBackTop"></BackTop>
  <DetailBottomBar></DetailBottomBar>
</div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper.vue"
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParams from "./childComps/DetailParams";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailBottomBar from "./childComps/DetailBottomBar";

import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/content/goods/GoodsList";
import { getDetail, Goods, Shop, GoodsParam, getRecommend } from "network/detail";
import BackTop from "components/content/backtop/BackTop";

import {debounce} from "common/utils";
import {backTopMixin, itemListenerMixin} from "common/mixin";
import {BACK_POSITION} from "../../common/const";
export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParams,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    GoodsList,
  },
  mixins:[itemListenerMixin, backTopMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopYs: null,
      currentIndex: 0,
    }
  },
  created() {
    //  1.保存传入的iid
    this.iid = this.$route.params.iid;
    //  2.根据iid请求详情数据
    getDetail(this.iid).then(res => {
      //  中转数据
      const data = res.result;
      //  1.获取顶部轮播图数据
      this.topImages = data.itemInfo.topImages;
      //  2.获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);

      //  3.创建店铺信息对象
      this.shop = new Shop(data.shopInfo);

      //  4.保存商品的详情数据
      this.detailInfo = data.detailInfo;

      //  5.获取参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);
      //  6.获取评论信息
      if(data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
    })
    //  3.请求推荐数据
    getRecommend().then(res => {
      this.recommends = res.data.list;
    })

    //  4.给getThemeTopYs赋值
    this.getThemeTopYs = debounce(() => {
      //  获取每个部分对应的y坐标值
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      this.themeTopYs.push(Number.MAX_VALUE);
      console.log(this.themeTopYs)
    }, 100)

  },
  mounted() {
  //  使用了混入，不需要再写了
    console.log("Detail组件mounted");
  },
  destroyed() {
    //  2.取消全局事件的监听
    this.$bus.$off('itemImgLoad', this.itemImgListener);
  },
  methods: {
    imageLoad() {
      this.$refs.scroll.refresh();
      this.getThemeTopYs();
    },
    //  导航栏被点击切换
    titleClick(index) {
      console.log(index);
      this.$refs.scroll.scrollTo(0,-this.themeTopYs[index], 200);
    },

    contentScroll(position) {
      //  1.获取y值
      const positionY = -position.y;
      let length = this.themeTopYs.length
      //  2.和主题中的值比较
      for (let i = 0; i < length-1; i++) {
        if(this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])) {
          console.log(i)
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
        }
        this.ListenerShowBackTop(position)
      }
    }
  }
}
</script>

<style scoped>
  #detail {
    height: 100vh;
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .content {
    /*height: calc(100% - 44px - 2.09rem);*/
    height: calc(100% - 44px);
    overflow: hidden;
  }
</style>
