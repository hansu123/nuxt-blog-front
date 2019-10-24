import Vue from 'vue'
import Element from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
import API from "@/apis"
import storage from "@/utils/helpers/storage"

//全局组件
import MyCatalogue from "@/components/content/SubCatalogue";
Vue.component("MyCatalogue",MyCatalogue)

//过滤器

import filters from "@/utils/filters"
Object.keys(filters).forEach(key=>{
  Vue.filter(key,filters[key])
})


//原型
Vue.prototype.$API=API
Vue.prototype.$storage=storage
Vue.use(Element, { locale })
