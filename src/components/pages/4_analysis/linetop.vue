<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6">
        <StationSelect @StationChange="PigChange"></StationSelect>
      </el-col>
      <el-col :span="6">
        <el-input placeholder="请输入耳标号" v-model="fitpig">
        </el-input>
      </el-col>
      <el-col :span="6">
        <el-button type="primary" @click="picture">查询</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import StationSelect from '../../common/StationSelect'
import {
  getStationPig
} from '../../../api/request'
export default {
  name: 'linetop',
  components: {
    StationSelect
  },
  data () {
    return {
      NowStationId: '',
      fitpig: ''
    }
  },
  methods: {
    async GetPigs () {
      const res = await getStationPig({ id: this.NowStationId })
      this.existpigs = res.data.stationpig
    },
    PigChange (StationId) {
      this.NowStationId = StationId
      this.GetPigs()
    },
    picture () {
      this.$emit('picture', this.fitpig)
    }
  }
}
</script>

<style scoped>
  .el-select{
    width: 210px;
  }
  .el-input{
    width: 210px;
  }
</style>
