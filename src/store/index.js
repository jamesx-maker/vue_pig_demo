import Vue from 'vue'
import Vuex from 'vuex'
// import { getsystem } from '../../../api/request'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    RoomId: 0,
    StationIist: []
  },
  mutations: {
    SetRoomId (state, RoomId) {
      state.RoomId = RoomId
    },
    SetStationId (state, StationIist) {
      state.StationIist = StationIist
    }
  },
  actions: {
  },
  modules: {
  }
})
