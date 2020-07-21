<template>
  <div>
    <bread bigtitle="母猪管理" smalltitle="转栏" icon="el-icon-magic-stick"></bread>
    <div class="container">
      <el-row :gutter="20" class="row">
        <el-col :span="6">
          <StationSelect @StationChange="PigChange"></StationSelect>
<!--          <el-select v-model="pig_stationid"-->
<!--                     clearable-->
<!--                     placeholder="请选择饲喂站"-->
<!--                     @change="getstationpig(pig_stationid)"-->
<!--                     size="250px"-->
<!--                     filterable-->
<!--          >-->
<!--            <el-option-->
<!--              v-for="item in station_options"-->
<!--              :key="item.value"-->
<!--              :label="item.label"-->
<!--              :value="item.value">-->
<!--            </el-option>-->
<!--          </el-select>-->
        </el-col>
      </el-row>
      <el-table :data="existpigs" border>
        <el-table-column label="身份码" prop="pigid" align="center"></el-table-column>
        <el-table-column label="耳标号" prop="earid" align="center"></el-table-column>
        <el-table-column label="品种" prop="pigkind" align="center"></el-table-column>
        <el-table-column label="设置新饲喂站" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="change(scope.row.pigid)">转栏</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="请选择新的饲喂站" :visible.sync="dialogFormVisible" width="400px">
        <el-select v-model="newstation" placeholder="请选择新的饲喂站" style="margin-left: 80px">
          <el-option
            v-for="item in NewStationList"
            :key="item.index"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <div slot="footer" class="dialog-footer">
          <el-button @click="close">取 消</el-button>
          <el-button type="primary" @click="changestation">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  getStationPig,
  changestation
} from '../../../api/request'
import bread from '../../common/bread'
import StationSelect from '../../common/StationSelect'

export default {
  name: 'changestation',
  data () {
    return {
      NewStationList: [],
      existpigs: [],
      dialogFormVisible: false,
      newstation: '',
      NowStationId: '',
      sendpigid: ''
    }
  },
  components: {
    bread,
    StationSelect
  },
  methods: {
    async GetPigs () {
      const res = await getStationPig({ id: this.NowStationId })
      this.existpigs = res.data.stationpig
    },
    PigChange (StationId, StationList) {
      this.NowStationId = StationId
      this.NewStationList = StationList
      this.GetPigs()
    },
    close () {
      this.dialogFormVisible = false
      this.$message({
        type: 'info',
        message: '已取消转栏'
      })
    },
    change (pigid) {
      this.sendpigid = pigid
      this.dialogFormVisible = true
    },
    changestation () {
      if (this.newstation === '') {
        this.$message({
          type: 'warning',
          message: '没有选择新的饲喂站'
        })
      } else {
        console.log(this.sendpigid)
        changestation({ newstation: this.newstation, pigid: this.sendpigid }).then(res => {
          console.log(res)
          this.dialogFormVisible = false
          this.GetPigs()
          this.$message({
            type: 'success',
            message: '转栏成功'
          })
        })
      }
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
  width: 210px;
}
.el-input{
  width: 210px;
}
</style>
