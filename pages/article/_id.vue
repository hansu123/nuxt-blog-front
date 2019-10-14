<template>
  <div id="articlesDetails">
    <div class="detail-header">
      <h1>{{articleData.title}}</h1>
      <!-- <div class="time">{{new Date(articleDetails.date).format('yyyy-MM-dd')}}</div> -->
      <!-- <div class="detail-body-tag">
        <span v-for="list in articleDetails.label" :key="list" class="tag">{{list}}</span>
      </div> -->
    </div>
    <div class="detail-body" v-html="markHtml"></div>
    <!-- <div class="detail-footer">
      <Comment :comment="articleDetails.comment" :authUrl="authUrl" />
    </div> -->
    <!-- <div v-show="background" class="background">
      <div class="img-wrapper">
        <img :src="backgroundImg" class="background-animate" />
      </div>
      <img src="../../assets/close.png" class="close" @click="hidePrview" />
    </div> -->
  </div>
</template>

<script>
import marked from "@/plugins/marked"
import ArticleModel from "@/apis/articleModel";
export default {
  async asyncData({ params, error }) {
    try {
      const { id } = params;
      let query = {
        _id: id
      };
      const { data: articleData } = await ArticleModel.GetArticleDetail(query);
      let { content } = articleData;
      const markHtml = marked(content);
      return { articleData, markHtml };
    } catch (err) {
      error({ statusCode: 404 });
    }
  },
  name: "height",
  data() {
    return {};
  }
};
</script>
<style lang='scss' scoped>
.detail-body pre {
  background:#282a36 !important;
}
#articlesDetails {
  width:100%;
  box-sizing: border-box;
  // overflow: scroll;
  // text-align: center;
  // padding: 0 1rem;
  // background-color: #fff;
  // -webkit-font-smoothing: antialiased;
  // opacity: 1;
  // -webkit-transform: translate3d(0, 10px, 0);
  // transform: translate3d(0, 10px, 0);
}
.detail-header {
  width: 100%;
  margin-left: -20%;
  background-color: #004c99;
  min-height: 200px;
  padding-left: 20%;
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
.detail-body-tag {
  padding-left: 22px;
}
.detail-body-tag span {
  float: left;
  border-radius: 2px;
  padding: 4px 8px;
  background-color: #fff;
  margin-right: 10px;
  box-shadow: 1px 1px 1px rgba(2, 58, 114, 0.1);
}
.detail-body-tag span:nth-child(1n) {
  background-color: #007fff;
  color: #fff;
}
.detail-body {
  color: #666;
  padding: 22px;
}
/*
Monokai Sublime style. Derived from Monokai by noformnocontent http://nn.mit-license.org/
*/

.hljs {
  display: block;
  overflow-x: auto;
  padding: 0.5em;
  background: #23241f;
}

.hljs,
.hljs-tag,
.hljs-subst {
  color: #f8f8f2;
}

.hljs-strong,
.hljs-emphasis {
  color: #a8a8a2;
}

.hljs-bullet,
.hljs-quote,
.hljs-number,
.hljs-regexp,
.hljs-link {
  color: #ae81ff;
}
.hljs-literal {
  color: #f92672;
}
.hljs-code,
.hljs-title,
.hljs-section,
.hljs-selector-class {
  color: #a6e22e;
}

.hljs-strong {
  font-weight: bold;
}

.hljs-emphasis {
  font-style: italic;
}

.hljs-keyword {
  color: #66d9ef;
}
.hljs-selector-tag,
.hljs-name {
  color: #f92672;
}
.hljs-attr {
  color: #a6e22e;
}

.hljs-symbol,
.hljs-attribute {
  color: #66d9ef;
}

.hljs-params {
  color: #fd971f;
}
.hljs-class .hljs-title {
  color: #f8f8f2;
}

.hljs-string,
.hljs-type,
.hljs-builtin-name,
.hljs-selector-id,
.hljs-selector-attr,
.hljs-selector-pseudo,
.hljs-addition,
.hljs-variable,
.hljs-template-variable {
  color: #e6db74;
}
.hljs-built_in {
  color: #66d9ef;
}
.hljs-comment,
.hljs-deletion,
.hljs-meta {
  color: #75715e;
}
.hljs-comment {
  font-style: inherit;
}
</style>