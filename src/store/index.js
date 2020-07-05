import Vue from 'vue'
import Vuex from 'vuex'
import { StationList } from '../api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    station_list: []
  },
  mutations: {
  },
  actions: {
    a () {
      StationList.then(res => {
        console.log(res)
      })
    }
  },
  modules: {
  }
})
