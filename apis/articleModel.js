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
}
export default new ArticleModel()