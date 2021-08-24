<template>
  <div ref="wrapper" class="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
    click: {
      type: Boolean,
      default: true,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      scroll: null,
    };
  },
  computed: {},
  mounted() {
    // 1.创建对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      scrollY: true,
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,
    });
    // 2.监听滚动的位置
    this.scroll.on("scroll", (position) => {
      // 监听到滚动向外发送事件,把位置position传递出去
      this.$emit("scroll", position);
    });
    // 3.监听上拉事件
    this.scroll.on("pullingUp", () => {
      console.log("上拉加载更多");
      // 向外发送事件
      this.$emit("pullingUp");
    });
    console.log(this.scroll);
  },
  methods: {
    // 跳转到指定位置
    scrollTo(x, y, time = 100) {
      this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x, y, time);
    },
    // 结束上拉加载行为
    finishPullUp() {
      this.scroll.finishPullUp()
    },
    // 更新滚动区域
    refresh() {
      console.log("refresh执行");
      this.scroll && this.scroll.refresh()
    },
    // 获取当前的y左边值
    getScrollY() {
      return this.scroll ? this.scroll.y : 0;
    }
  },
};
</script>

<style scoped>
</style>
