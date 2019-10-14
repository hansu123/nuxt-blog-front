<template>
  <div id="articlesDetails" class="fadein">
    <div class="detail-header">
      <h1>{{articleDetails.title}}</h1>
    </div>
    <div class="detail-body" v-html="markHtml"></div>
    <div class="detail-extra">
      <a>上一篇：我和我的祖国</a>
    </div>
    <div class="detail-footer">
      <Comment :comment="articleDetails.comment" :authUrl="authUrl" />
    </div>
    <div v-show="background" class="background">
      <div class="img-wrapper">
        <img :src="backgroundImg" class="background-animate" />
      </div>
      <img src="../../assets/close.png" class="close" @click="hidePrview" />
    </div>
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
import { dateFormat } from "../../utils/index";
import marked from "marked";
// import axios from '~/plugins/axios';
import highlight from "highlight.js/lib/highlight";
import javascript from "highlight.js/lib/languages/javascript";
import css from "highlight.js/lib/languages/css";
import php from "highlight.js/lib/languages/php";
import python from "highlight.js/lib/languages/python";
import sql from "highlight.js/lib/languages/sql";
import bash from "highlight.js/lib/languages/bash";
highlight.registerLanguage("javascript", javascript);
highlight.registerLanguage("css", css);
highlight.registerLanguage("php", php);
highlight.registerLanguage("python", python);
highlight.registerLanguage("sql", sql);
highlight.registerLanguage("bash", bash);
import ArticleModel from "@/apis/articleModel";
import Comment from "@/components/Comment";
import "../../assets/hybrid.css";
import { mapMutations } from "vuex";
import BuildCatalogue from "@/libs/catalogue"
dateFormat();
export default {
  name: "Articledetails",
  data() {
    return {
      background: false,
      backgroundImg: "",
      markHtml: "",
      articleDetails: {}
    };
  },
  head() {
    return {
      title: this.articleDetails.title || "binlive",
      meta: [
        {
          hid: "description",
          name: "description",
          content: `${this.articleDetails.title},前端开发,前端,web前端开发,node,vue,react,webpack,git`
        },
        { name: "keywords", content: this.articleDetails.title }
      ]
    };
  },
  async mounted() {
    let query = {
      _id: this.$route.params.id
    };
    let { data } = await this.$API.ArticleModel.GetArticleDetail(query);
    this.articleDetails = data;
    marked.setOptions({
      renderer: new marked.Renderer(),
      gfm: true,
      tables: true,
      breaks: false,
      pedantic: false,
      sanitize: false,
      smartLists: true,
      smartypants: false,
      highlight: function(code, lang) {
        return highlight.highlightAuto(code).value;
      }
    });

    this.markHtml = marked(this.articleDetails.content);
    this.$nextTick(function() {
      let catalogues=new BuildCatalogue({className:"detail-body"})
      this.SET_CATALOGUE(catalogues.getFinalTree());
    });

    document.querySelectorAll(".detail-body img").forEach(item => {
      item.addEventListener("click", () => {
        document.documentElement.style.overflow = "hidden";
        this.background = true;
        this.backgroundImg = item.src;
      });
    });
  },
  methods: {
    hidePrview() {
      this.background = false;
      this.backgroundImg = "";
      document.documentElement.style.overflow = "auto";
    },
    ...mapMutations("article", ["SET_CATALOGUE"])
  },
  computed: {
    authUrl() {
      const id = this.$route.params.id;
      return `https://github.com/login/oauth/authorize?client_id=ee9b0ae4553f4fb449bf&state=${id}&redirect_uri=http://www.binlive.cn:3080/api/oauth`;
    }
  },
  components: {
    Comment
  },
  beforeDestroy() {
    window.loading = this.$loading({
      lock: true,
      text: "Loading",
      background: "rgba(255, 255, 255, 0.7)"
    });
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
.detail-extra {
  padding: 10px 0;
}
.background {
  width: 100%;
  height: 100%;
  background-color: #fff;
  position: fixed;
  left: 0px;
  top: 0px;
  z-index: 888;
  padding-top: 140px;
}
.img-wrapper {
  width: 80%;
  height: 100%;
  overflow: auto;
  margin: 0 auto;
  padding: 0px 0px 30px 0px;
}
.img-wrapper img {
  width: 100%;
  transition: all 0.3s ease-in-out;
}
.close {
  position: fixed;
  right: 4%;
  top: 130px;
  width: 50px;
  opacity: 0.4;
  cursor: pointer;
}

</style>
