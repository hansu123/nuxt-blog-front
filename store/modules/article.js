import { SET_CATALOGUE, SET_ARTICLELIST,SET_ARTICLEDETAIL} from "../mutationTypes"
import API from "@/apis"
const articleModule = {
  namespaced: true,
  state: {
    catalogues: [],
    articleList: [],
    articleDetail:{}
  },
  mutations: {
    SET_CATALOGUE(state, payload) {
      console.log(payload)
      state.catalogues = payload
    },
    SET_ARTICLELIST(state, payload) {
      state.articleList = payload
    },
    SET_ARTICLEDETAIL(state,payload){
      state.articleDetail=payload
    }
  },
  actions: {
    async GetArticleDetailAction({ commit}, payload) {
      let { data } = await API.ArticleModel.GetArticleDetail(payload);
      commit(SET_ARTICLEDETAIL,data)
    }
  }
}

export default articleModule