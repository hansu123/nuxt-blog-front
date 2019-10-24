import lodash from "@/utils/lodash"

class Storage {
  get(key) {
    let value = localStorage.getItem(key)
    return lodash.IsJSONStr(value) ? JSON.parse(value) : value
  }
  set(key, value) {
    if (value instanceof Object) {
      localStorage.setItem(key, JSON.stringify(value))
    }
    else {
      localStorage.setItem(key, value)
    }
  }
  has(key) {
    try{localStorage.getItem(key)}
    catch(err){
      return false
    }
  }
  remove(key) {
    localStorage.removeItem(key)
  }
  clear() {
    localStorage.clear()
  }
}
export default new Storage()