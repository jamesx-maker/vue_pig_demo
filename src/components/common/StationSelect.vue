<template>
  <div>
    <el-select v-model="StationId"
               clearable
               placeholder="请选择饲喂站"
               @change="getstationpig(StationId)"
               size="250px"
               filterable>
      <el-option
        v-for="item in StationList"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
  </div>
</template>

<script>
import {
  getstation
} from '../../api/request'

export default {
  name: 'StationSelect',
  data () {
    return {
      StationList: [],
      StationId: ''
    }
  },
  async created () {
    const res = await getstation()
    this.StationList = res.data.station_options
  },
  methods: {
    getstationpig (StationId) {
      this.$emit('StationChange', StationId)
    }
  }
}
</script>

<style scoped>

</style>
