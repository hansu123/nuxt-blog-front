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
import ArticleList from "@/components/ArticleList";
import ArticleModel from "@/apis/articleModel";
export default {
  name: "latestArticles",
  head() {
    return {
      title: "binlive",
      meta: [
        {
          hid: "description",
          name: "description",
          content: "binlive前端开发,前端,web前端开发,node,vue,react,webpack,git"
        },
        {
          name: "keywords",
          content: "binlive前端开发,前端,web前端开发,node,vue,react,webpack,git"
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
        pagesize:10,
        lastpage: false,
        fadetitle: true,
        showScroll: false,
        showLoading:false
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
          this.showLoading=false;
        } else {
          this.lastpage = true;
          this.showLoading=false;
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
    }
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll, false);
  }
};
</script>

<style scoped>
.lastpagetip {
  font-size: 14px;
}
</style>
