<template>
<div class="detail">
  <DetailNavBar></DetailNavBar>
  <h2>{{iid}}</h2>
</div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import {getDetail} from "network/detail";
export default {
  name: "Detail",
  components: {
    DetailNavBar
  },
  data() {
    return {
      iid: null
    }
  },
  created() {
    //  1.保存传入的iid
    console.log('ss',this.$route.params);
    this.iid = this.$route.params.iid;
    //  2.根据iid请求详情数据
    getDetail(this.iid).then(res => {
      console.log('11',res)
    })
  }
}
</script>

<style scoped>

</style>
