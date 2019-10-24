class Lodash {
    IsJSONStr(value) {
        try {
            if (JSON.parse(value) instanceof Object) {
                return true
            }
        }
        catch (err) {
            return false
        }
    }
}


export default new Lodash()