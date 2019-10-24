<template>
  <div>
    <div class="grid-content bg-purple container">
      <div class="tagtitle">
        <p :class="{fadetitle: fadetitle}">推荐</p>
      </div>
      <ArticleList :articleList="articleList" />
      <div class="scrollbottomtip">
        <p v-if="showScroll" style="position:relative;top:-15px;height:24px;"></p>
        <div v-if="showLoading">
          <p>数据加载中</p>
          <i class="el-icon-loading"></i>
        </div>
      </div>
      <p v-if="lastpage" class="lastpagetip">我也是有底线的...</p>
    </div>
  </div>
</template>
<script>
import { ArticleList } from "@/components";
import ArticleModel from "@/apis/articleModel";
import { mapMutations } from "vuex";
export default {
  name: "latestArticles",
  head() {
    return {
      title: "hanblog",
      meta: [
        {
          hid: "description",
          name: "description",
          content: "jed前端开发,前端,web前端开发,node,vue,react,webpack,git"
        },
        {
          name: "keywords",
          content: "jed前端开发,前端,web前端开发,node,vue,react,webpack,git"
        }
      ]
    };
  },
  async asyncData({ params, error }) {
    try {
      let query = {
        pagesize: 10,
        currentPage: 1
      };
      let { list } = await ArticleModel.GetArticleList(query);
      return {
        articleList: list,
        currentPage: 1,
        pagesize: 10,
        lastpage: false,
        fadetitle: true,
        showScroll: false,
        showLoading: false
      };
    } catch (err) {
      error({ statusCode: 404 });
    }
  },
  components: {
    ArticleList
  },
  mounted() {
    // const { newArticlelist } = this.$store.state;
    this.SET_ARTICLELIST(this.articleList);
    window.addEventListener("scroll", this.handleScroll);

    if (window.loading) {
      window.loading.close();
    }
    if (false) {
      this.articleList = [];
      return;
    }
  },
  methods: {
    //下拉加载更多
    async nextpage() {
      if (!this.lastpage) {
        let query = {
          pagesize: this.pagesize,
          currentPage: ++this.currentPage
        };
        let { list, total } = await ArticleModel.GetArticleList(query);
        if (list.length) {
          this.articleList = [...this.articleList, ...list];
          this.showScroll = false;
          this.showLoading = false;
        } else {
          this.lastpage = true;
          this.showLoading = false;
          this.showScroll = false;
        }
      }
    },
    handleScroll() {
      const jrscrollTop =
        document.documentElement.scrollTop ||
        window.pageYOffset ||
        document.body.scrollT;
      let scrollBottom =
        document.body.clientHeight - window.innerHeight - jrscrollTop;
      if (scrollBottom < 30) {
        if (!this.lastpage) {
          this.showLoading = true;
          this.nextpage();
        }
      }
    },
    ...mapMutations("article", ["SET_ARTICLELIST"])
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll, false);
  }
};
</script>

<style lang="scss" scoped>
.lastpagetip {
  width: 100%;
  margin: 0 auto;
  text-align: center;
  font-size: 14px;
  color: #999;
  border-bottom: 1px solid #eee;
  padding-bottom: 6px;
  margin-bottom: -1px;
}

.scrollbottomtip {
  & > div {
    width: 140px;
    margin: 0 auto;
    & > p {
      float: left;
      margin-left: 14px;
    }
    & > i {
      margin-top: 4px;
      color: #999;
    }
  }
}
</style>
