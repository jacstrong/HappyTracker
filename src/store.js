import Vue from 'vue'
import Vuex from 'vuex'
import Cookies from 'js-cookie'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username: ''
  },
  mutations: {
    newUsername (state, newUsername) {
      this.state.username = newUsername
      Cookies.set('username', newUsername, { expires: 365 })
    }

  },
  actions: {
    setCurrentUser (context) {
      console.log(Cookies.get('username'))
      if (Cookies.get('username') !== undefined) {
        this.state.username = Cookies.get('username')
      }
    }
  }
})
