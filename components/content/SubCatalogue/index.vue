<template>
  <div class="catalogue_wrapper">
    <ul>
      <div v-for="item of catalogues" :key="item.id">
        <li :class="getClass(item.name.slice(-1))" v-html="item.tag"></li>
        <my-catalogue v-if="item&&item.children.length" :catalogues="item.children"></my-catalogue>
      </div>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    catalogues: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {};
  },
  methods:{
    getClass(num){
      return `title-${num}`
    }
  }
};
</script>
<style lang='scss' scoped>
.title-3 {
  margin: 5px 0 5px 20px;
  list-style: disc;
}
.title-4 {
  margin: 5px 0 5px 35px;
  list-style: circle;
}
</style>