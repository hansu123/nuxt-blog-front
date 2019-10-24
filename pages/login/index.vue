<template>
  <div></div>
</template>

<script>
import {mapActions} from "vuex"
export default {
  data() {
    return {
      loading: ""
    };
  },
  methods: {
    ...mapActions("user",["GetUserInfoAction"])
  },
  async mounted() {
    await this.GetUserInfoAction(this.$route.query.code)
    this.$router.push(this.$storage.get("url"))
  }
};
</script>
<style lang='scss' scoped>
</style>