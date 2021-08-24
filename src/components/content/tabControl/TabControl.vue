<template>
<div class="tab-control">
  <div v-for="(item, index) in titles"
       class="tab-control-item"
       :class="{active: index === currentIndex}"
       @click="itemClick(index)">
    <span>{{item}}</span>
  </div>
</div>
</template>

<script>
export default {
  name: "TabControl",
  props: {
    //  使用组件时传入标题数据
    titles: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data () {
    return {
      //  记录当前被选中的item
      currentIndex: 0
    }
  },
  methods: {
    //item点击
    itemClick(index) {
      this.currentIndex = index;
    //  向外传递事件,index标记哪一个被点击
      this.$emit('tabClick', index);
    }
  }
}
</script>

<style scoped>
  .tab-control {
    display: flex;
    text-align: center;
    font-size: 15px;
    height: 40px;
    line-height: 40px;
    background-color: #fff;
    /*background-color: #42b983;*/
  }
  .tab-control-item {
    flex: 1;
  }
  .tab-control-item span {
    padding: 5px;
  }
/*  被选中的样式*/
  .active {
    color: var(--color-high-text);
  }
  .active span {
    border-bottom: 3px solid var(--color-tint);
  }
</style>
