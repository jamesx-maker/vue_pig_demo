<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

// import {
//   getstation
// } from './api/request'

export default {
  name: 'app',
  created () {
    // getstation().then(res => {
    //   this.$store.commit('Set_Build_Unit_StationId', res.data.station_options)
    // })
    // 在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem('store')) {
      this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem('store'))))
    }
    // 在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('store', JSON.stringify(this.$store.state))
    })
  }
}
</script>

<style>
  @import "./assets/css/main.css";
  @import "./assets/css/color-dark.css";     /*深色主题*/
</style>
