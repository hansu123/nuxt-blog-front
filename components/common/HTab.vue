<template>
<div class='tab_wrapper'>
  <div v-for="(elem,i) of tabData" :key="elem.value" :class="['tab_item_content',currentIndex===i?'active':'']" @click="changeTab(i)">
    {{elem.value}}
  </div>
</div>
</template>

<script>

export default {
props:{
  tabData:{
    type:Array,
    default:()=>[]
  }
},
data() {
return {
 currentIndex:0
};
},
computed: {},
methods: {
 changeTab(index){
   this.currentIndex=index
   this.$emit("changeTab",index)
 }
},
created() {

},
}
</script>
<style lang='scss' scoped>
@import "@/styles/global.scss";
@import "@/styles/mixin.scss";
.tab_wrapper{
  width:100%;
  display:flex;
  padding:1rem;
  box-sizing: border-box;
  .active{
    color:$theme-active-color!important;
  }
  .tab_item_content{
    position: relative;
    padding:0 1rem;
    font-size:0.8rem;
    color:#909090;
    cursor: pointer;
    &:not(:last-child):after{
      content:"";
      width:2px;
      height:100%;
      background:#ccc;
      position: absolute;
      right:0;
    }
  }
}
</style>