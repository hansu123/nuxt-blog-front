<template>
  <div id="articlesDetails" class="fadein">
    <div class="detail-header">
      <h1>{{articleDetail.title}}</h1>
      <div class="time">{{articleDetail.postTime|dateFilter}}</div>
      <!-- <div class="detail-body-tag">
        <span v-for="list in articleDetails.label" :key="list" class="tag">{{list}}</span>
      </div>-->
    </div>
    <div class="detail-body" v-html="markHtml"></div>
    <div class="detail_extra" v-if="extraArticleList.length">
      <div
        v-for="article of extraArticleList"
        :key="article._id"
        class="detail_extra_item"
        @click="showDetail(article._id)"
      >
        <span v-if="article.type==='prev'&&article.title">上一篇:</span>
        <span v-if="article.type==='next'&&article.title">下一篇:</span>
        {{article.title}}
      </div>
    </div>
    <div class="detail-footer">
      <Comment :authUrl="authUrl" />
    </div>
    <preview-image :imgSrc.sync="imgSrc"></preview-image>
    <el-backtop :bottom="100">
      <div
        style="{
        height: 100%;
        width: 100%;
        background-color: #f2f5f6;
        box-shadow: 0 0 6px rgba(0,0,0, .12);
        text-align: center;
        line-height: 40px;
        color: #1989fa;
      }"
      >UP</div>
    </el-backtop>
  </div>
</template>

<script>
import marked from "@/utils/helpers/markdown";
import { Comment } from "@/components";
import "../../assets/hybrid.css";
import { mapState, mapMutations } from "vuex";
import BuildCatalogue from "@/libs/catalogue";
import PreviewImage from "@/components/common/PreviewImage";
export default {
  name: "Articledetail",
  async fetch({ store, params }) {
    let commentQuery = {
      id: params.id,
      pagesize:5,
      currentPage:1
    };
    await store.dispatch("comment/GetCommentListAction", commentQuery)
    let articleQuery={
      id:params.id
    }
    return await store.dispatch("article/GetArticleDetailAction", articleQuery);
  },
  data() {
    return {
      imgSrc: "",
      markHtml: "",
      extraArticleList: []
    };
  },
  head() {
    return {
      title: this.articleDetail.title || "binlive",
      meta: [
        {
          hid: "description",
          name: "description",
          content: `${this.articleDetail.title},前端开发,前端,web前端开发,node,vue,react,webpack,git`
        },
        { name: "keywords", content: this.articleDetail.title }
      ]
    };
  },
  async mounted() {
    this.markHtml = marked(this.articleDetail.content);
    this.$nextTick(function() {
      let catalogues = new BuildCatalogue({ className: "detail-body" });
      this.SET_CATALOGUE(catalogues.getFinalTree());
    });

    //图片预览
    this.$nextTick(() => {
      document.querySelectorAll(".detail-body img").forEach(item => {
        item.addEventListener("click", () => {
          this.imgSrc = item.src;
        });
      });
    });

    //上一篇和下一篇
    this.extraArticleList = this.articleList.reduce((prev, curr, index) => {
      if (curr._id === this.$route.params.id) {
        if (index >= 1) {
          let { _id, title } = this.articleList[index - 1];
          prev.push({ _id, title, type: "prev" });
        } else {
          prev.push({});
        }

        if (index < this.articleList.length - 1) {
          let { _id, title } = this.articleList[index + 1];
          prev.push({ _id, title, type: "next" });
        } else {
          prev.push({});
        }
      }
      return prev;
    }, []);
    console.log("extra", this.extraArticleList);
  },
  methods: {
    showDetail(id) {
      this.$router.push({ path: `/details/${id}` });
    },
    ...mapMutations("article", ["SET_CATALOGUE"])
  },
  computed: {
    authUrl() {
      const id = this.$route.params.id;
      return `https://github.com/login/oauth/authorize?client_id=2cbb754c153faa480225&state=${id}&redirect_uri=http://localhost:1818/login`;
    },
    ...mapState("article", ["articleList", "articleDetail"])
  },
  components: {
    Comment,
    PreviewImage
  },
  beforeDestroy() {
    this.SET_CATALOGUE([]);
  }
};
</script>

<style lang="scss" scoped>
@keyframes fadeInRight {
  from {
    opacity: 0.6;
    transform: translate3d(20px, 0, 0);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
.fadein {
  animation-name: fadeInRight;
  animation-duration: 1s;
  animation-fill-mode: both;
}
.detail-body pre {
  background-color: #282a36 !important;
}
#articlesDetails {
  height: 100vh;
  overflow: scroll;
  text-align: center;
  padding: 0 1rem;
  background-color: #fff;
  -webkit-font-smoothing: antialiased;
  opacity: 1;
  -webkit-transform: translate3d(0, 10px, 0);
  transform: translate3d(0, 10px, 0);
}
.detail-header {
  background-color: #004c99;
  box-sizing: border-box;
  min-height: 200px;
  padding-left: 10%;
}

.detail-header > h1 {
  font-size: 24px;
  color: #fff;
  font-weight: 900;
  padding-top: 100px;
  text-align: left;
  padding-left: 20px;
}
.detail-header .time {
  font-size: 14px;
  color: #f2f2f2;
  margin-top: 10px;
  margin-bottom: 4px;
  text-align: left;
  padding-left: 22px;
}

.detail-body {
  text-align: left;
  border-bottom: 1px solid #f0f0f0;
  color: #666;
  padding: 22px;
  padding-bottom: 10px;
  min-height: 500px;
  padding-top: 40px;
}
.detail_extra {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  &_item {
    cursor: pointer;
    &:hover {
      color: #2eb3ff;
    }
  }
}
</style>
