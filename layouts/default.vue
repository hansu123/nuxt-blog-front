<template>
  <div id="app">
    <el-row :gutter="0">
      <el-col class="nav" :sx="24" :sm="24" :md="24" :lg="24">
        <el-col class="nav-bar" :sx="24" :sm="24" :md="16" :lg="16">
          <div class="nav-bar-body">
            <div class="nav-bar-inner">
              <div id="logo">
                <img
                  src="https://hansu-1253325863.cos.ap-shanghai.myqcloud.com/newblog/web/icon-img/icon.png"
                  alt="binlive个人技术博客vue、react、node"
                />
              </div>
            </div>
            <div>
              <a href="http://admin.binlive.cn/my" target="_blank" id="avatar">
                <img
                  src="https://hansu-1253325863.cos.ap-shanghai.myqcloud.com/newblog/web/icon-img/icon.png"
                  alt
                />
              </a>
              <div id="search">
                <el-input
                  placeholder="搜索"
                  :on-icon-click="searchArticle"
                  v-model="search"
                  @keyup.enter.native="keyupsearch($event)"
                >
                  <i slot="prefix" class="el-input__icon el-icon-search"></i>
                </el-input>
              </div>
            </div>
          </div>
          <div class="navmenu">
            <template>
              <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane
                  v-for="item in taglists"
                  :key="item"
                  :label="item"
                  :name="item"
                  data-ripple
                ></el-tab-pane>
              </el-tabs>
              <!-- <el-button type="primary" icon="el-icon-menu" id="gomobilebtn" @click="gimobile" style="margin-right: 10px">课程</el-button> -->
              <el-button type="primary" id="gomobilebtn" @click="login">登陆</el-button>
              <el-button type="primary" class="addacticlebtn" @click="login">注册</el-button>
            </template>
          </div>
        </el-col>
      </el-col>
    </el-row>
    <el-row style="display:flex;justify-content:center;">
      <el-col :xs="24" :sm="24" :md="16" :lg="16" class="container_article">
        <el-row class="main"  :gutter="20" >
          <el-col :span="16" :xs="24" :sm="24" :md="16" :lg="18">
            <nuxt />
          </el-col>
          <el-col :span="4" :xs="24" :sm="24" :md="8" :lg="6" class="sm_hide">
            <div class="main_sider">
              <mySider></mySider>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <div class="footer">京ICP备17044565号我们</div>
  </div>
</template>
<script>
import marked from "marked";
import MySider from "@/components/content/MySider";
export default {
  name: "app",
  data() {
    return {
      taglists: ["推荐"],
      search: "",
      activeName: ""
    };
  },
  mounted() {
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
    // this.taglist();
    var winwinth = window.innerWidth;
    if (this.$route.params.tag === undefined && this.$route.fullPath === "/") {
      this.activeName = "推荐";
    } else {
      this.activeName = this.$route.params.tag;
    }
  },
  components: {
    MySider
  },
  methods: {
    // taglist() {
    //   axios.get('/api/getArticleLabel').then(
    //     respone => {
    //       const tagList = (respone.data.tagList || []).map(item => item.tagName);
    //       this.taglists = ['最新', ...tagList];
    //     });
    // },
    keyupsearch(ev) {
      if (ev.keyCode === 13) {
        this.searchArticle();
      }
    },
    handleClick(tab) {
      const { index } = tab;
      this.$router.push({ path: `/${index == 0 ? "" : tab.name}` });
    },
    searchArticle() {
      const trimSearch = this.search.trim();
      if (!trimSearch) {
        return this.$notify.info({
          title: "提示",
          message: "您还未输入搜索内容",
          offset: 100
        });
      }
      this.$router.push({ path: `/search/${this.search}` });
    },
    login() {
      this.$message({
        message: "暂未开发"
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.nav {
  width: 100%;
  height: 106px !important;
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 99;
  background-color: #fafafa;
  border-top: 4px solid #4267b2;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.1), 0 1px rgba(66, 66, 66, 0.1);
  display: flex;
  justify-content: center;
  &-bar {
    height: 100%;
    display: block !important;
    margin: 0 auto;
    position: relative;
    float: none !important;
    &-body {
      float: left;
      width: 100%;
      height: 64px;
      padding-left: 100px;
      position: relative;
      & > ul > li {
        height: 100%;
        text-align: center;
        color: #666;
        font-size: 18px;
        padding-right: 20px;
        float: left;
        &:hover {
          height: 8vh;
          line-height: 8vh;
          text-align: center;
          color: #32d3c3;
          cursor: pointer;
          background-color: #26252f;
        }
      }
      .borderRightActive {
        border-right: 4px solid #32d3c3;
        color: #32d3c3;
      }

      .nav-bar-inner {
        height: 100%;
        width: 80px;
        float: left;
        text-align: center;
        color: #32d3c3;
        font-size: 18px;
        position: absolute;
        left: 0px;
        top: 0px;
        & > span {
          width: 85%;
          float: left;
        }
        #logo {
          width: 80px;
          height: 60px;
          overflow: hidden;
          img {
            width: 70%;
          }
        }
      }
    }
  }
  .mobile-nav-bar {
    float: left;
  }
  .navmenu {
    width: 100%;
    height: 42px;
    position: absolute;
    bottom: 0px;
    border-top: 1px solid #eee;
    padding-right: 190px;
    ul {
      overflow: hidden;
      height: 100%;
      a {
        float: left;
        padding-left: 12px;
        padding-right: 12px;
        line-height: 42px;
      }
    }
  }
}

.container_article {
  margin-top: 120px;
  overflow: hidden;
  box-sizing: border-box;
  position: relative;
  .main {
    box-shadow: 0px 1px 1px 1px rgba(110, 110, 110, 0.1);
    border-radius: 3px;
    min-height: 900px !important;
    position:relative;
    &_sider {
      height: 300px;

    }
  }
}
</style>