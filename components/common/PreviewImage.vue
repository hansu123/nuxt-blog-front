<template>
  <div v-if="imgSrc" class="preview_wrapper"  @click="hidePrview">
    <div class="img-wrapper">
      <img :src="imgSrc" class="background-animate" />
    </div>
    <img src="../../assets/close.png" class="close"/>
  </div>
</template>
<script>
export default {
  name: "PreviewImage",
  props: {
    imgSrc: {
      type: String
    }
  },
  data() {
    return {
      isShow:true
    };
  },
  methods:{
    //关闭预览
    hidePrview() {
      this.$emit("update:imgSrc","")
    }
  }
};
</script>
<style lang="scss" scoped>
.preview_wrapper {
  position: fixed;
  left: 0;
  right:0;
  top: 0;
  bottom:0;
  z-index: 101!important;
  .img-wrapper {
    width: 100%;
    height: 100%;
    display:flex;
    background:rgba(0,0,0,0.6);
    justify-content: center;
    align-items: center;
  }
  .img-wrapper img {
    width: 30rem;
    height:30rem;
    border-radius: 10px;
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
}
</style>