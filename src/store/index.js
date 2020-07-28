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
    Set_Build_Unit_StationId (state, StationList) {
      state.StationIist = StationList
    }
  },
  actions: {
  },
  modules: {
  }
})
