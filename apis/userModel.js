import {get,post} from "@/utils/helpers/request"
class UserModel{
  GetUserInfo(params){
    return get("/user/userInfo",params)
  }
}
export default new UserModel()