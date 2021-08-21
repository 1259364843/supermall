<template>
<div>
  <NavBar>
    <div slot="left" class="back" @click="backClick">
      <img src="~assets/img/common/back.svg" alt="">
    </div>
    <div slot="center" class="title">
      <div v-for="(item, index) in titles"
           class="title-item"
           :class="{active: index === curretIndex}"
           @click="titleClick(index)"
      >{{item}}</div>
    </div>
  </NavBar>

</div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
export default {
  name: "DetailNavBar",
  components: {
    NavBar
  },
  data() {
    return {
      titles: ['商品', '参数', '评论', '推荐'],
      curretIndex: 0
    }
  },
  methods: {
    //  当title被点击时,切换对应title
    titleClick(index) {
      this.curretIndex = index;
    },
    //  返回按钮的处理
    backClick() {
      this.$router.back();
      // this.$router.go(-1);
    }
  }
}
</script>

<style scoped>
  .title {
    display: flex;
  }
  .title-item {
    flex: 1;
    font-size: 12px;
  }
  /*被选中的样式*/
  .active {
    color: var(--color-high-text);
  }
  .active span {
    padding: 5px;
    border-bottom: 2px solid var(--color-tint);
  }
  .back img {
    margin-top: 12px;
  }
</style>
