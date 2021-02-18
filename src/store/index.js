import Vue from 'vue'
import Vuex from 'vuex'
import auth from "./auth.module"
import posts from "./posts.module"

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    auth,
    posts,
  }
})

export default store