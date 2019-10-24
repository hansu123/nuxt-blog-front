import {SET_USERINFO} from "../mutationTypes"
import API from "@/apis"
import storage from "@/utils/helpers/storage"
import {Message,Loading} from "element-ui";

let loading
let startLoading=()=>{
  loading = Loading.service({
    lock: true,
    text: "拼命加载中",
    background: "rgba(0,0,0,0.7)"
  })
}

let closeLoading=()=>{
  loading.close();
}

const userModule = {
  namespaced: true,
  state: {
    userInfo:null
  },
  mutations: {
    SET_USERINFO(state,payload){
      console.log(payload)
      state.userInfo=payload
      storage.set("userInfo",payload)
    }
  },
  actions:{
    async GetUserInfoAction({commit},payload){
      startLoading()
      let d = await API.UserModel.GetUserInfo({
        code:payload
      });
      if(Object.keys(d.userInfo).length){
        closeLoading()
        Message({
          type: "success",
          message:"授权成功",
          onClose:()=>{
            commit(SET_USERINFO,d.userInfo)
            return true
          }
        })
      }
      else{
        Message.error({
          message:"授权失败",
          onClose:()=>{
            return false
          }
        })
      }
    }
  }
}

export default userModule