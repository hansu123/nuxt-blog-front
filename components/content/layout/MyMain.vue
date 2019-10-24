<template>
  <div>
    <el-row class="article_wrapper">
      <el-col :xs="24" :sm="24" :md="16" :lg="16" class="article_container">
        <el-row class="main" :gutter="20">
          <el-col :span="16" :xs="24" :sm="24" :md="16" :lg="18">
            <nuxt />
          </el-col>
          <el-col :span="4" :xs="24" :sm="24" :md="8" :lg="6">
            <div class="main_sider" v-if="isShowSider">
              <mySider></mySider>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import MySider from "./MySider";
export default {
  name: "MyMain",
  props:{
   isMobile:{
     type:Boolean,
     default:true
   } 
  },
  data() {
    return {
    };
  },
  computed:{
    isShowSider(){
      let whiteRoute=["/nav"]
      return !this.isMobile &&!whiteRoute.includes(this.$route.path)
    }
  },
  components: {
    MySider
  }
};
</script>
<style lang="scss" scoped>
.article_wrapper{
  display:flex;
  justify-content:center;
  .article_container {
  margin-top: 120px;
  overflow: hidden;
  box-sizing: border-box;
  position: relative;

  .main {
    box-shadow: 0px 1px 1px 1px rgba(110, 110, 110, 0.1);
    border-radius: 3px;
    background-color: #f6f6f6;
    padding-bottom: 20px;
    min-height: 900px !important;
    position: relative;
    &_sider {
      height: 300px;
    }
  }
}
}

</style>