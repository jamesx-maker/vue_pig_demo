<template>
  <el-select v-model="pig_stationid"
             clearable
             placeholder="请选择饲喂站"
             @change="getstationpig(pig_stationid)"
             size="250px"
             filterable
  >
    <el-option
      v-for="item in station_options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</template>

<script>
import {
  getstation,
  getStationPig
} from '../../api/request'

export default {
  name: 'station_select',
  data () {
    return {
      station_options: [],
      pig_stationid: ''
    }
  },
  created () {
    getstation({ pageIndex: '空' }).then(res => {
      // console.log(res)
      this.station_options = res.data.station_options
    })
  },
  methods: {
    getstationpig (id) {
      getStationPig({ id: id }).then(res => {
        // console.log(res)
        this.existpigs = res.data.stationpig
      })
    }
  }
}
</script>

<style scoped>

</style>
