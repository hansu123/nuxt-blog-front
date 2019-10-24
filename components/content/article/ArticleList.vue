<template>
  <div class="articleList">
    <el-row :gutter="20" style="padding-bottom:12px">
      <el-col
        :xs="24"
        :sm="24"
        :md="24"
        :lg="24"
        v-for="item in articleList"
        :key="item._id"
        class="artitem"
      >
        <div @click="articlesDetailsFn(item._id)" class="artitem_container">
          <div class="articles-box">
            <div class="post-time">
              <span class="post-timecon">
                <b style="color:#b71ed7">专栏</b>
                · {{item.author}} · {{item.postTime|DateFilter}}
                ·
                <i
                  class="el-icon-price-tag"
                ></i>
                {{item.cate}}
              </span>
            </div>
            <div class="article_info">
              <div class="article_body">
                <div class="post-title">
                  <h1 class="wes-2">{{item.title}}</h1>
                </div>
                <div class="post-abstract wes-2">{{item.summary}}</div>
              </div>
              <div class="article_cover">
                <img :src="item.cover_img" />
              </div>
            </div>
            <div class="artitem_bottom">
              <img :src="defaultPoster" alt />
              <a class="read_more">阅读更多</a>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { Loading } from "element-ui";
export default {
  name: "ArticleList",
  props: {
    articleList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      defaultPoster: "http://img.binlive.cn/upload/1508147650899",
      posters: {
        javascript: "http://img.binlive.cn/upload/1508147650899",
        node: "http://img.binlive.cn/upload/1508147665291",
        css: "http://img.binlive.cn/upload/1508147554750",
        html5: "http://img.binlive.cn/upload/1508147586798",
        jquery: "http://img.binlive.cn/upload/1508147631388",
        vue: "http://img.binlive.cn/upload/1508147700511",
        git: "http://img.binlive.cn/upload/1508147609623",
        react: "http://img.binlive.cn/upload/1525527435206react.png"
      }
    };
  },
  filters: {
    DateFilter(val) {
      let str = new Date(Number(val)).toLocaleDateString();
      return str
        .split("/")
        .map(time => {
          return time.length < 2 ? time.padStart(2, "0") : time;
        })
        .join("-");
    }
  },
  methods: {
    articlesDetailsFn(id) {
      this.$router.push({ path: `/details/${id}` });
    }
  }
};
</script>

<style lang="scss" scoped>
.article_info {
  display: flex;
  padding-bottom: 10px;
  .article_body {
    width: 80%;
  }
  .article_cover {
    flex: 1;
    img {
      width: 100px;
    }
  }
}

.artitem {
  &:hover {
    -moz-transition: all 0.3s ease-in-out;
    -o-transition: all 0.3s ease-in-out;
    -webkit-transition: all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
    -webkit-transform: translate3d(0, -3px, 0);
    .post-title > h1 {
      color: #1d8ce0 !important;
      -moz-transition: all 0.3s ease-in-out;
      -o-transition: all 0.3s ease-in-out;
      -webkit-transition: all 0.3s ease-in-out;
      transition: all 0.3s ease-in-out;
    }
  }

  &_container {
    padding: 16px 20px 0;
    overflow: hidden;
    background: #fff;
    border-top: 1px solid rgba(151, 151, 151, 0.08);
    border-radius: 3px;
    box-shadow: 0 1px 2px rgba(151, 151, 151, 0.6);
    margin-bottom: 30px;
    position: relative;
    &:hover {
      background-color: #fafafa;
      -moz-transition: all 0.3s ease-in-out;
      -o-transition: all 0.3s ease-in-out;
      -webkit-transition: all 0.3s ease-in-out;
      transition: all 0.3s ease-in-out;
      box-shadow: 0px 1px 1px 1px rgba(0, 0, 0, 0.1);
      border-top: 1px solid #fff;
      border-radius: 3px;
    }
    &:before {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(255, 255, 255, 0.5);
      content: "";
      -webkit-transform: scale3d(1.9, 1.4, 1) rotate3d(0, 0, 1, 45deg)
        translate3d(0, -150%, 0);
      transform: scale3d(1.9, 1.4, 1) rotate3d(0, 0, 1, 45deg)
        translate3d(0, -150%, 0);
      cursor: pointer;
    }
    &:hover:before {
      -moz-transition: all 0.6s ease-in-out;
      -o-transition: all 0.6s ease-in-out;
      -webkit-transition: all 0.6s ease-in-out;
      transition: all 0.6s ease-in-out;
      -webkit-transform: scale3d(1.9, 1.4, 1) rotate3d(0, 0, 1, 45deg)
        translate3d(0, 0%, 0);
      transform: scale3d(1.9, 1.4, 1) rotate3d(0, 0, 1, 45deg)
        translate3d(0, 0%, 0);
      background-color: rgba(255, 255, 255, 0.1);
    }
    .articles-box {
      width: 100%;
      margin-top: 10px;
      margin-bottom: 5px;
      text-align: center;
      cursor: pointer;
    }

    .artitem_bottom {
      width: 100%;
      height: 50px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid #eee;
      padding: 10px 0;

      img {
        width: 30px;
        height: 30px;
        border-radius: 50%;
      }

      .read_more {
        color: #fff;
        border-radius: 4px;
        background: #44c1b8;
        padding: 5px 12px;
        font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
          Microsoft YaHei, 微软雅黑, Arial, sans-serif;
        box-shadow: 3px 2px 2px rgba(36, 61, 107, 0.1);
      }
    }
  }
}
</style>
