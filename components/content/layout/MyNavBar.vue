<template>
  <div id="app">
    <el-row :gutter="0">
      <el-col class="nav" :sx="24" :sm="24" :md="24" :lg="24">
        <el-col class="nav-bar" :sx="24" :sm="24" :md="16" :lg="16">
          <!-- mobile导航条 -->

          <mobile-nav v-if="isMobile"></mobile-nav>

          <div class="nav-bar-body" style="display:flex" v-else>
            <div class="nav-bar-inner">
              <div id="logo">
                <img
                  src="https://hansu-1253325863.cos.ap-shanghai.myqcloud.com/newblog/web/icon-img/icon.png"
                  alt="binlive个人技术博客vue、react、node"
                />
              </div>
            </div>
            <div>
              <el-menu
                :default-active="$route.path"
                class="el-menu-demo"
                mode="horizontal"
                active-text-color="#4cbcfe"
                @select="handleSelect"
              >
                <el-menu-item index="/">首页</el-menu-item>
                <el-menu-item index="/tool">工具</el-menu-item>
                <el-menu-item index="/nav"><i class="el-icon-position"></i>快捷导航</el-menu-item>
                <el-submenu index="/docs">
                  <template slot="title">个人文档</template>
                  <el-menu-item index="vue-docs">
                    <i class="el-icon-link"></i>vue
                  </el-menu-item>
                  <el-menu-item index="react-docs">
                    <i class="el-icon-link"></i>react
                  </el-menu-item>
                  <el-menu-item index="wx-docs">
                    <i class="el-icon-link"></i>小程序
                  </el-menu-item>
                </el-submenu>
              </el-menu>
            </div>
            <div class="nav-bar-right">
              <my-search></my-search>
              <a href="http://admin.binlive.cn/my" target="_blank" class="avatar">
                <img
                  src="https://hansu-1253325863.cos.ap-shanghai.myqcloud.com/newblog/web/icon-img/icon.png"
                  alt
                />
              </a>
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
            </template>
          </div>
        </el-col>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import MySearch from "@/components/common/MySearch";
import MobileNav from "@/components/content/layout/MobileNav";
export default {
  name: "MyNavBar",
  props: {
    isMobile: {
      type: Boolean,
      default: false
    }
  },
  asyncData({params}) {
    console.log(params)
  },
  data() {
    return {
      taglists: ["推荐", "前端", "后端"],
      activeName: "推荐"
    };
  },
  mounted() {
    // this.taglist();

    if (this.$route.params.tag === undefined && this.$route.fullPath === "/") {
      this.activeName = "推荐";
    } else {
      this.activeName = this.$route.params.tag;
    }
  },
  components: {
    MySearch,
    MobileNav
  },
  methods: {
    // taglist() {
    //   axios.get('/api/getArticleLabel').then(
    //     respone => {
    //       const tagList = (respone.data.tagList || []).map(item => item.tagName);
    //       this.taglists = ['最新', ...tagList];
    //     });
    // },

    handleClick(tab) {
      const { index } = tab;
      this.$router.push({ path: `/${index == 0 ? "" : tab.name}` });
    },

    login() {
      this.$message({
        message: "暂未开发"
      });
    },
    handleSelect(index) {
      switch (index) {
        case "/home":
          this.$router.push({
            path: "/"
          });
          break;
        case "/tool":
          this.$router.push({
            path: "tool"
          });
          break;
        case "/nav":
          this.$router.push({
            path: "/nav"
          });
          break;
        default:
          this.$router.push({
            path: "/"
          });
      }
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
    background-color: hsla(0, 0%, 100%, 0.8);
    &-body {
      float: left;
      width: 100%;
      height: 64px;
      padding-left: 100px;
      position: relative;
      .avatar {
        margin:10px 15px 0 10px;
        width: 36px;
        height: 36px;
        overflow: hidden;
        float: right;
      }
      .avatar img {
        width: 100%;
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
      .nav-bar-right{
        display:flex;
        justify-content:flex-end;
        flex:1
      }
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
          &:hover {
            background-color: #eee;
            border-radius: 5px;
          }
        }
      }

      .navmenu button {
        padding-left: 28px;
        span {
          position: relative;
          top: -2px;
        }
        i {
          position: absolute;
          top: -2px;
          font-size: 18px;
          left: 8px;
          top: 6px;
        }
      }
    }
  }
  .mobile-nav-bar {
    float: left;
  }
}
</style>