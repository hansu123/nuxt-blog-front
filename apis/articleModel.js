import {get,post} from "@/utils/helpers/request"
class ArticleModel{
  GetArticleList(params){
    return get("/article/articleList",params)
  }

  GetArticleDetail(params){
    return get("/article/detail",params)
  }

  ArticleSearch(data){
    return post("/article/search",data)
  }

  GetCommentList(params){
    return get("/article/commonList",params)
  }

  AddComment(data){
    return post("/article/comment",data)
  }

  AddSubComment(data){
    return post("/article/subComment",data)
  }
}
export default new ArticleModel()