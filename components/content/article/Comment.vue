<template>
  <div class="comment">
    <!-- 发表评论 -->
    <div class="comment-item">
      <div class="item_avatar">
        <img :src="avatar" @click="handleAuth" style="cursor:pointer" />
      </div>
      <div class="textarea">
        <el-input
          type="textarea"
          :rows="5"
          placeholder="请输入评论内容"
          maxlength="1050"
          v-model="textarea"
        ></el-input>
        <el-button
          type="primary"
          size="medium"
          class="comment-button"
          @click="handlecomment"
          :loading="commenting"
          :disabled="!textarea.trim()"
        >评论</el-button>
      </div>
    </div>
    <!-- 发表评论结束 -->

    <!-- 评论展示 -->
    <div class="comment-content">
      <div
        :class="{'fadeOutRight':false}"
        class="comment-item fadeInRight"
        v-for="(comment,index) in commentList"
        :key="comment.created"
      >
        <div class="item_avatar">
          <img :src="comment.avatar_url" />
        </div>
        <div class="item_content">
          <div class="item_header">
            <a :href="comment.html_url" target="_blank">
              <h1 style="color: #009a61;">{{comment.name||comment.login}}</h1>
            </a>
            <span>{{comment.created|dateFilter}}</span>
          </div>

          <div class="item_body">
            <p>{{comment.content}}</p>
          </div>

          <div class="item_footer">
            <i
              class="el-icon-chat-line-round"
              style="color:#009a61;cursor:pointer;margin-right:10px"
              @click="handleReply(comment)"
            ></i>
          </div>

          <!-- 评论回复展示 -->
          <div
            :class="{'fadeOutRight':false}"
            class="comment-item fadeInRight"
            style="background-color:#fafbfc;border-radius:3px;"
            v-for="(subComment,index) in comment.subComments"
            :key="subComment.created"
          >
            <div class="item_avatar">
              <img :src="subComment.avatar_url" />
            </div>
            <div class="item_content">
              <div class="item_header">
                <a :href="subComment.html_url" target="_blank">
                  <h1 style="color: #009a61;">{{subComment.name||subComment.login}}</h1>
                </a>
                <span>{{subComment.created|dateFilter}}</span>
              </div>
              <div class="item_body">
                <p>
                  <span>回复</span>
                  <span style="color:red;margin:0 10px">{{subComment.replyeder}}</span>
                  :
                  {{subComment.content}}
                </p>
              </div>
              <div class="item_footer">
                <i
                  class="el-icon-chat-line-round"
                  style="color:#009a61;cursor:pointer;margin-right:10px"
                  @click="handleReply(comment)"
                ></i>
              </div>
            </div>
          </div>
          <!-- 评论回复结束 -->

          <!-- 回复 -->
          <div class="item_reply_content" v-if="showReply">
            <div class="textarea" style="margin-bottom:10px;">
              <el-input
                type="textarea"
                :rows="1"
                :placeholder="replyeder"
                maxlength="50"
                :disabled="true"
              ></el-input>
            </div>
            <div class="textarea">
              <el-input
                type="textarea"
                :rows="2"
                placeholder="请输入回复内容"
                maxlength="200"
                v-model="subTextarea"
              ></el-input>
              <el-button
                type="primary"
                size="medium"
                class="comment-button"
                @click="handleReplyComment(index)"
                :loading="commenting"
                :disabled="!subTextarea.trim()"
              >回复</el-button>
            </div>
          </div>
          <!-- 回复结束 -->
        </div>
      </div>
      <div class="comment_more" @click="handleLoadMore">
        查看更多
        <i class="el-icon-arrow-right"></i>
      </div>
    </div>
    <!-- 评论展示结束 -->
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "Comment",
  data() {
    return {
      textarea: "",
      subTextarea: "",
      commenting: false,
      showReply: false,
      subcommenting: false,
      id: "",
      replyeder: "",
      currIndex: -1,
      currentPage:1
    };
  },
  props: {
    authUrl: String
  },
  computed: {
    userauth() {
      return this.user ? this.user.html_url : this.authUrl;
    },
    avatar() {
      return this.user
        ? this.user.avatar_url
        : "http://img.binlive.cn/upload/1525002348985";
    },
    ...mapState("comment", ["commentList"])
  },
  mounted() {
    this.init();
  },
  methods: {
    //初始化数据
    init() {
      this.user = this.$storage.get("userInfo");
      this.id = this.$route.params.id;
    },
    //验证
    handleAuth() {
      this.$storage.set("url", this.$route.path);
      return (window.location.href = this.userauth);
    },
    //提交评论，没有登录需要验证
    async handlecomment() {
      if (!this.user) {
        this.handleAuth();
      }
      this.commenting = true;
      let comment = JSON.parse(JSON.stringify(this.user));
      comment.content = this.textarea;
      comment.subComments = [];
      comment.created = Date.now();
      let query = {
        id: this.id,
        data: comment
      };
      let { code, message } = await this.AddCommentAction(query);
      if (code === 0) {
        this.textarea = "";
        this.commenting = false;
        this.$message({
          message,
          type: "success"
        });
      }
    },
    //回复
    handleReply(content, index) {
      if (!this.user) {
        return (window.location.href = this.authUrl);
      }
      if (this.currIndex == index) {
        this.showReply = !this.showReply;
      } else {
        this.currIndex = index;
        this.showReply = true;
      }
      this.replyeder = `@${content.name || content.login}`;
    },
    async handleReplyComment(index) {
      let comment = JSON.parse(JSON.stringify(this.user));
      comment.content = this.subTextarea;
      comment.created = Date.now();
      comment.replyeder = this.replyeder.slice(1);
      //添加回复
      let query = {
        index,
        id: this.id,
        data: comment
      };
      let { code, message } = await this.AddSubCommentAction(query);
      if (code === 0) {
        this.subTextarea = "";
        this.$message({
          message,
          type: "success"
        });
      }
    },
    async handleLoadMore() {
      let query={
        id:this.id,
        pagesize:5,
        currentPage:++this.currentPage
      }
      let d=await this.GetCommentListAction(query)
      if(d.length===0){
        this.$message({
          type:"warning",
          message:"已无更多数据"
        })
      }
    },
    ...mapActions("comment", ["GetCommentListAction","AddCommentAction", "AddSubCommentAction"])
  }
};
</script>
<style scoped lang="scss">
.textarea {
  flex: 1;
}

.comment-button {
  padding: 6px 12px;
  font-size: 15px;
  letter-spacing: 2px;
  float: right;
  margin-top: 10px;
}

.comment-item {
  overflow: hidden;
  margin-bottom: 10px;
  padding: 15px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.09);
  display: flex;
  .item_avatar {
    margin-right: 14px;
    width: 40px;
    height: 40px;
    border-radius: 4px;
    overflow: hidden;
    float: left;
    img {
      width: 100%;
    }
  }
  .item_content {
    flex: 1;
    .item_header {
      display: flex;
      justify-content: space-between;
      padding: 10px 15px;
    }
    .item_body {
      text-align: left;
      padding: 10px 15px;
    }
    .item_footer {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      padding: 10px 15px;
    }
  }
}

.comment-item span {
  float: left;
  color: #666;
  font-size: 13px;
  line-height: 18px;
}

.comment-item-con {
  padding-top: 46px;
  padding-left: 50px;
  padding-right: 30px;
  margin-bottom: 30px;
}

.comment-item-con p {
  color: #333;
  font-size: 14px;
  text-align: left;
}

.comment-item-con i {
  font-style: normal;
  color: #287156;
  font-size: 14px;
}

.children-comment {
  padding-right: 60px;
  margin-top: 14px;
}

.children-comment-wrapper {
  position: relative;
  top: -10px;
}

.children-comment-wrapper i {
  position: absolute;
  top: 10px;
  right: 4px;
  display: inline-block;
  cursor: pointer;
}
.removecomment {
  position: absolute;
  top: 10px;
  right: 4px;
  display: inline-block;
  cursor: pointer;
  right: 48px !important;
  font-style: normal;
  color: #287156;
  font-size: 14px;
}
.comment-item-sub .removecomment {
  right: 15px !important;
}
.comment-item-sub {
  overflow: hidden;
  margin-top: 4px;
  padding: 10px 20px 10px 20px;
  background-color: #fafafa;
  border-radius: 4px;
  overflow: hidden;
  margin-left: 50px;
  position: relative;
}

.comment-item-sub p {
  padding-top: 30px;
  padding-left: 40px;
  text-align: left;
  word-wrap: break-word;
  word-break: normal;
  font-size: 13px;
  color: #666;
}

.comment-item-sub .avatar {
  width: 30px;
  height: 30px;
}

.ok-style {
  padding: 8px;
  position: absolute;
  right: 0px;
  top: 16px;
}

.comment_more {
  padding:10px;
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translate3d(10%, 0, 0);
  }

  to {
    opacity: 1;
    transform: none;
  }
}

.fadeInRight {
  animation-name: fadeInRight;
  animation-duration: 0.5s;
  animation-fill-mode: both;
}

@keyframes fadeOutRight {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
    transform: translate3d(10%, 0, 0);
  }
}

.fadeOutRight {
  animation-name: fadeInRight;
  animation-duration: 0.5s;
  animation-name: fadeOutRight;
}
</style>
