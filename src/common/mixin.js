import {debounce} from "./utils";
import {BACK_POSITION} from "common/const";
import BackTop from "components/content/backtop/BackTop";
export const itemListenerMixin = {
  data() {
    itemImgListener: null
  },
  mounted() {
    //  1.监听商品item中图片加载完成
    const refresh = debounce(this.$refs.scroll.refresh, 50);
    //  保存监听的事件
    this.itemImgListener = () => {
      refresh();
    }
    this.$bus.$on("itemImageLoad",this.itemImgListener );
    console.log("我是混入后的内容");
  }
}

//  返回顶部按钮抽取
export const backTopMixin = {
  data() {
    return {
      isShowBackTop: false,
    }
  },
  components: {
    BackTop,
  },
  methods: {
    backClick() {
      // this.$refs.scroll.scroll.scrollTo(0, 0, 500)
      this.$refs.scroll.scrollTo(0, 0, 500)
    },
    ListenerShowBackTop(position) {
      this.isShowBackTop =  -position.y > BACK_POSITION ? true : false;
    }
  }
}
