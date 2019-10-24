<template>
  <div class="article_list_wrapper">
    <div class="article_list_content">
      <div>
        <el-card class="box-card">
          <div class="banner_content"></div>
        </el-card>
      </div>

      <div>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>标签云</span>
          </div>
          <div class="card_tag_body">
            <el-tag>JavaScript</el-tag>
            <el-tag type="success">Vue</el-tag>
            <el-tag type="info">Scss</el-tag>
            <el-tag type="warning">数据结构</el-tag>
            <el-tag type="danger">MongoDB</el-tag>
            <el-tag type="danger">Node.JS</el-tag>
          </div>
        </el-card>
      </div>
      <div class="catalogues_wrapper" v-if="catalogues.length">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>文章目录</span>
          </div>
          <div class="catalogues_container">
            <div class="catalogues_item" v-for="item of catalogues" :key="item.id">
              <div v-html="item.tag" class="catalogues_item_parent"></div>
              <my-catalogue v-if="item.children.length" :catalogues="item.children"></my-catalogue>
            </div>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
    };
  },
  computed: {
    ...mapState("article", ["catalogues"])
  },
  mounted() {
  }
};
</script>
<style lang='scss' scoped>
.article_list_wrapper {
  .article_list_content {
    & > div:not(:first-child) {
      margin: 20px 0;
    }
    .box-card {
      .banner_content {
        height: 10rem;
        background: url("https://hansu-1253325863.cos.ap-shanghai.myqcloud.com/newblog/web/core-img/banner3.jpg")
          no-repeat;
        background-size: cover;
      }
      .card_tag_body {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        & > span {
          margin: 5px;
        }
      }
      .catalogues_container {
        .catalogues_item {
          font-weight: bold;
          color: #004c99;
          &_parent {
            margin: 10px 0;
          }
        }
      }
    }
  }
}
</style>