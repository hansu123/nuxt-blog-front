//创建markdown目录

const filterArr=item=>item

class BuildCatalogue{
  constructor(options){
    this.$className=options.className
    this.articleNodes=[]
    this.simpleHNodes=[]
    this.init()
  }

  getNodes(){
    return document.getElementsByClassName(this.$className)[0]
  }

  getTag(title){
    let titleID = `#${title.id}`
    let titleLink = `<a href=${titleID}>${title.innerText}</a>`
    return titleLink
  }

  filterHNode(){
    Array.from(this.articleNodes.children).forEach(item => {
      if (["H2", "H3", "H4"].includes(item.nodeName)) {
        //解决target因为头部fixed造成的跳转位置不准确bug，具体的样式可以自行调整
        item.style["padding-top"] = "120px";
        item.style["margin-top"] = "-100px";
        this.simpleHNodes.push({
          id: item.id,
          name: item.nodeName,
          html: item.innerHTML,
          text: item.innerText,
          children: [],
          tag:this.getTag(item)
        });
      }
    });
  }

  init(){
    this.articleNodes=this.getNodes()
    this.filterHNode()
  }

  emitTreeChildren(arr){
    let max = arr[0];
    arr.forEach((item, i) => {
      if (item.name.slice(-1) > max.name.slice(-1)) {
        max.children.push(item);
        //因为已经合并到父级的children里，所以可以自行删除，但是又不能使用splice因为会改变
        delete arr[i]
      } else {
        max = item;
      }
    });
    arr = arr.filter(filterArr)
    arr.length&&arr.forEach(elem => {
      elem.children=elem.children.filter(filterArr)
      elem.children.length>0&&this.emitTreeChildren(elem.children)
    })
    return arr
  };

  getFinalTree(){
    return this.emitTreeChildren(this.simpleHNodes)
  }

}
export default BuildCatalogue