import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userIsAuthorized:false,
  },
  mutations: {
    setUserIsAuthenticated(state, replacement){
      state.userIsAuthorized = replacement;
    }
  },
  actions: {

  }
})
