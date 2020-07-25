<template>
  <div>
    <bread bigtitle="测试页面" smalltitle="测试" icon="el-icon-magic-stick"></bread>
    <div class="container">
      <el-row :gutter="20" class="row">
        <el-col :span="6">
          <StationSelect @StationChange="PigChange"></StationSelect>
        </el-col>
      </el-row>
      <el-table :data="existpigs" border>
        <el-table-column label="身份码" prop="pigid" align="center"></el-table-column>
        <el-table-column label="耳标号" prop="earid" align="center"></el-table-column>
        <el-table-column label="品种" prop="pigkind" align="center"></el-table-column>
        <el-table-column label="是否离栏" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="subpigs(scope.row.pigid)">离栏</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import bread from '../common/bread'
import StationSelect from '../common/StationSelect'
import {
  getStationPig
} from '../../api/request'
export default {
  name: 'test',
  components: {
    bread,
    StationSelect
  },
  data () {
    return {
      existpigs: []
    }
  },
  methods: {
    async PigChange (StationId) {
      console.log(StationId)
      const res = await getStationPig({ id: StationId })
      console.log(res)
      this.existpigs = res.data.stationpig
    }
  }
}
</script>

<style scoped>
  .el-table{
    margin-top: 10px;
  }
  .el-col{
    margin-top: 10px;
  }
  .el-select{
    width: auto;
    max-width: 210px;
  }
  .el-input{
    width: 210px;
  }
</style>
