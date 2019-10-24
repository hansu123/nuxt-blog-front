<template>
  <div class="nav_wrapper">
    <el-tabs>
      <el-tab-pane label="JS">
        
      </el-tab-pane>
      <el-tab-pane label="Vue">
        <el-row :gutter="10" class="nav_item">
          <el-col v-for="(o, index) in 4" :key="o" :sm="24" :md="8" :lg="6" class="nav_item_content">
            <el-card>
              <img
                src="https://hansu-1253325863.cos.ap-shanghai.myqcloud.com/han-admin-TS/img/blog/1570677504971e.png"
                class="image"
                style="width:100%"
              />
              <div>
                <div class="bottom clearfix" style="text-align:center">
                  <a href="https://cn.vuejs.org/" target="_blank">vue官方网站</a>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="React">React</el-tab-pane>
      <el-tab-pane label="小程序">小程序</el-tab-pane>
      <el-tab-pane label="NodeJS">NodeJS</el-tab-pane>
      <el-tab-pane label="Git">Git</el-tab-pane>
      <el-tab-pane label="优秀项目">优秀项目</el-tab-pane>
      <el-tab-pane label="数据库">数据库</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentDate: new Date()
    };
  },
  computed: {},
  methods: {},
  created() {}
};
</script>
<style lang='scss' scoped>
@keyframes artitemanimate {
  0% {
    opacity: 0;
    -webkit-transform: translate3d(0, 10px, 0);
    -ms-transform: translate3d(0, 10px, 0);
    transform: translate3d(0, 10px, 0);
  }
  80% {
    opacity: 1;
    -webkit-transform: translate3d(0, 0px, 0);
    -ms-transform: translate3d(0, 0px, 0);
    transform: translate3d(0, 0px, 0);
  }
}

.nav_wrapper{
  .nav_item{
    &_content{
      animation: {
        name:artitemanimate;
        duration:1s;
        fill-mode:both;
      }
    }
  }
}
</style>