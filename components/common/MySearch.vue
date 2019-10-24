<template>
  <div id="search">
    <el-input
      placeholder="腾讯云cos存储"
      :on-icon-click="searchArticle"
      v-model="search"
      @keyup.enter.native="keyupsearch($event)"
    >
      <i slot="prefix" class="el-input__icon el-icon-search"></i>
    </el-input>
  </div>
</template>
<script>
export default {
  name: "MySearch",
  data() {
    return {
      search: "",
    };
  },
  methods: {
    searchArticle() {
      const trimSearch = this.search.trim();
      if (!trimSearch) {
        return this.$notify.info({
          title: "提示",
          message: "您还未输入搜索内容",
          offset: 100
        });
      }
      this.$router.push({ path: `/search/${this.search}` });
    },
    keyupsearch(ev) {
      if (ev.keyCode === 13) {
        this.searchArticle();
      }
    },
  }
};
</script>
<style scoped lang="scss">
#search {
  width: 50%;
  right: 100px;
  height: 40px;
  margin-top: 10px;
}
</style>