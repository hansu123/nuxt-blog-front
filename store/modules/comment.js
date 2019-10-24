import { SET_COMMENT,ADD_SUBCOMMENT,ADD_COMMENT, DEL_COMMENT} from "../mutationTypes"
import API from "@/apis"


const commentModule = {
  namespaced: true,
  state: {
    commentList: []
  },
  mutations: {
    SET_COMMENT(state,payload){
      state.commentList=[...state.commentList,...payload]
    },
    ADD_COMMENT(state, payload) {
      state.commentList.push(payload) 
    },
    DEL_COMMENT(state, payload) {
       
    },
    ADD_SUBCOMMENT(state, payload){
      let {index,data}=payload
      state.commentList[index].subComments.push(data)
    }
  },
  actions:{
    async GetCommentListAction({commit},payload){
      
      let {list}=await API.ArticleModel.GetCommentList(payload)
      if(list.length){
        commit("SET_COMMENT",list)
      }

      return list
    },
    async AddCommentAction({commit},payload){
      let d=await API.ArticleModel.AddComment(payload)
      if(d.code==0){
        commit("ADD_COMMENT",payload.data)
      }
      return d
    },
    async AddSubCommentAction({commit},payload){
      console.log(payload)
      let d=await API.ArticleModel.AddSubComment(payload)
      commit("ADD_SUBCOMMENT",payload)
      return d
    }
  }
}
export default commentModule