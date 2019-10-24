//时间格式过滤器
const dateFilter=(val)=>{
  let str=new Date(val).toLocaleDateString()
  return str.split("/").map(time=>{
     return time.length<2?time.padStart(2,'0'):time
  }).join("-")
}

export default {
  dateFilter
}