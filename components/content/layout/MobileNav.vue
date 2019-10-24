<template>
  <div class="nav_wrapper">
    <div class="nav_container">
      <div id="logo">
        <img
          src="https://hansu-1253325863.cos.ap-shanghai.myqcloud.com/newblog/web/icon-img/icon.png"
          alt="binlive个人技术博客vue、react、node"
        />
      </div>
      <div>
        <el-icon
          class="el-icon-menu"
          style="font-size:25px;color:#2eb3ff"
          @click.native="toggleMenu"
        ></el-icon>
      </div>
    </div>
    <div class="menu_container" v-if="isShowMenu">
      <ul class="menu_content">
        <li class="menu_content_item" @click="goPage('home')">
          首页
          <span :class="['menu_content_item_line',currentIndex==='home'?'active':'']"></span>
        </li>
        <li class="menu_content_item" @click="goPage('article')">
          工具
          <span :class="['menu_content_item_line',currentIndex==='article'?'active':'']"></span>
        </li>
        <li class="menu_content_item" @click="goPage('about')">
          快捷导航
          <span :class="['menu_content_item_line',currentIndex==='about'?'active':'']"></span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "MobileNav",
  data() {
    return {
      isShowMenu: false,
      currentIndex: "home"
    };
  },
  methods: {
    toggleMenu() {
      this.isShowMenu = !this.isShowMenu;
    },
    goPage(type) {
      switch (type) {
        case "home":
          this.currentIndex = "home";
          this.$router.push({
            path: "/"
          });
          break;
        case "article":
          this.currentIndex = "article";
          this.$router.push({
            path: "/"
          });
          break;
        case "about":
          this.currentIndex = "about";
          this.$router.push({
            path: "/"
          });
          break;
      }
    }
  }
};
</script>
<style scoped lang="scss">
.nav_wrapper {
  position: relative;
  .nav_container {
    position: relative;
    padding: 10px 20px 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .menu_container {
    position: absolute;
    background-color: hsla(0, 0%, 100%, 0.8);
    top: 60px;
    right: 0;
    z-index: 100;
    .menu_content {
      padding: 10px 15px;
      &_item {
        position: relative;
        padding: 10px;
        &:after {
          content: "";
          background: rgba(76, 188, 254, 0.44);
          display: block;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 50%;
          transform: scale(1, 1);
          opacity: 0;
          transition: all 0.8s;
        }

        &:active:after {
          transform: scale(0, 0);
          opacity: 1;
          transition: 0s;
        }

        &_line {
          position: absolute;
          bottom: 0;
          left: 10px;
          right: 10px;
          height: 2px;
        }
        .active {
          background: #2eb3ff;
        }
      }
    }
  }
}
</style>