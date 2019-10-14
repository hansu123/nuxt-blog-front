import {SET_CATALOGUE} from "../mutationTypes"

const articleModule = {
  namespaced: true,
  state: {
    catalogues:[]
  },
  getters: () => {

  },
  mutations: {
    SET_CATALOGUE(state, payload) {
      console.log(payload)
      state.catalogues = payload
    }
  }
}

export default articleModule