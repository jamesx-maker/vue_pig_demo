<template>
    <div>
      <bread bigtitle="母猪管理" smalltitle="离栏" icon="el-icon-magic-stick"></bread>
      <div class="container">
        <el-row :gutter="20" class="row">
          <el-col :span="6">
            <el-select v-model="subpig.pig_stationid"
                       clearable
                       placeholder="请选择饲喂站"
                       @change="getstationpig(subpig.pig_stationid)"
                       size="250px"
                       filterable
            >
              <el-option
                v-for="item in station_options"
                :key="item.index"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
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
  getstation,
  getStationPig,
  subtractionpig
} from '../../../api/request'
import bread from '../../common/bread'

export default {
  name: 'subtraction_pig',
  components: {
    bread
  },
  data () {
    return {
      stationpigs: [],
      station_options: [],
      existpigs: [],
      subpig: {
        pig_stationid: '',
        pigid: '',
        earid: '',
        pigkind: ''
      }
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
      // console.log(id)
      getStationPig({ id: id }).then(res => {
        // console.log(res)
        this.existpigs = res.data.stationpig
      })
    },
    subpigs (pigid) {
      console.log(pigid)
      this.$confirm('此操作将使母猪离栏,是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        subtractionpig({ pigid: pigid }).then(res => {
          getStationPig({ id: this.subpig.pig_stationid }).then(res => {
            // console.log(res)
            this.existpigs = res.data.stationpig
          })
        })
        this.$message({
          type: 'success',
          message: '离栏成功!'
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
