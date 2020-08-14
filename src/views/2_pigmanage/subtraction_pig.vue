<template>
  <div>
    <bread bigtitle="母猪管理" smalltitle="离栏" icon="el-icon-magic-stick"></bread>
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
import {
  getStationPig,
  subtractionpig
} from '../../api/request'
import bread from '../../components/common/bread'
import StationSelect from '../../components/common/StationSelect'

export default {
  name: 'subtraction_pig',
  components: {
    bread,
    StationSelect
  },
  data () {
    return {
      stationpigs: [],
      station_options: [],
      existpigs: [],
      NowStationId: '',
      subpig: {
        pigid: '',
        earid: '',
        pigkind: ''
      }
    }
  },
  methods: {
    async GetPigs () {
      const res = await getStationPig({ StationId: this.NowStationId })
      this.existpigs = res.data.stationpig
    },
    PigChange (StationId) {
      this.NowStationId = StationId
      this.GetPigs()
    },
    subpigs (pigid) {
      console.log(pigid)
      this.$confirm('此操作将使母猪离栏,是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        subtractionpig({ pigid: pigid }).then(res => {
          this.GetPigs()
          this.$message({
            type: 'success',
            message: '离栏成功!'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消离栏'
        })
      })
    }
  }
}
</script>

<style scoped>
/*.row{*/
/*  margin-bottom: 20px;*/
/*}*/
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
