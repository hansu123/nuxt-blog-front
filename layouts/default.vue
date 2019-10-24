<template>
  <div id="app">
    <my-nav-bar :isMobile="isMobile"></my-nav-bar>
    <my-main :isMobile="isMobile"></my-main>
    <my-footer></my-footer>
  </div>
</template>
<script>
import {MyNavBar,MyMain,MyFooter} from "@/components";
export default {
  name: "app",
  data() {
    return {
      isMobile:false
    };
  },
  components: {
    MyNavBar,
    MyMain,
    MyFooter
  },
  methods: {
    handleResize() {
      let winwinth = window.innerWidth;
      if (winwinth < 768) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    }
  },
  mounted() {
    //添加百度统计
    var _hmt = _hmt || [];
    (function() {
      var hm = document.createElement("script");
      hm.src = "https://hm.baidu.com/hm.js?66af132474dd9a5c2ebd172d8d08e81b";
      var s = document.getElementsByTagName("script")[0];
      s.parentNode.insertBefore(hm, s);
    })();
    console.log(
      "%c",
      "background: url(http://img.binlive.cn/upload/1525010252092) no-repeat center;padding-left:300px;padding-bottom: 200px"
    );

    //判断窗口大小
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  }
};
</script>
<style lang="scss" scoped>
#app {
  background-color: #f4f5f5;
}
</style>