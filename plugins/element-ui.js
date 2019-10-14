import Vue from 'vue'
import Element from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
import API from "@/apis"



import MyCatalogue from "@/components/content/SubCatalogue";
Vue.component("MyCatalogue",MyCatalogue)
Vue.prototype.$API=API
Vue.use(Element, { locale })
