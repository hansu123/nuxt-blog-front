import axios from "axios"
let baseURL=process.env.NODE_ENV === 'production'?"http://49.235.18.58:3000":"http://localhost:3000"
const request=axios.create({
  baseURL,
  timeout:20000,
  withCredentials:true
})

axios.interceptors.request.use(config=>{

})
axios.interceptors.response.use(response=>{

})

export const get=async (url,params={})=>{
  let d=await request({
    url,
    method:"get",
    params
  })
  return d.data
}

export const post=async (url,data={})=>{
  let d=await request({
    url,
    method:"post",
    data
  })
  return d.data
}
