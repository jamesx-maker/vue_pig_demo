<template>
    <div>
      <div class="crumbs">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>
            <i class="el-icon-magic-stick"></i> 母猪管理
          </el-breadcrumb-item>
          <el-breadcrumb-item>转栏</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="container">
        <el-row :gutter="20" class="row">
          <el-col :span="6">
            <el-select v-model="pig_stationid"
                       clearable
                       placeholder="请选择饲喂站"
                       @change="getstationpig(pig_stationid)"
                       size="250px">
              <el-option
                v-for="item in station_options"
                :key="item.value"
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
          <el-table-column label="设置新饲喂站" align="center">
            <template slot-scope="scope">
              <el-button size="mini" type="danger" @click="change">转栏</el-button>
              <el-dialog title="请选择新的饲喂站" :visible.sync="dialogFormVisible" width="400px">
                <el-select v-model="newstation" placeholder="请选择新的饲喂站">
                  <el-option
                    v-for="item in station_options"
                    :key="item.index"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="close">取 消</el-button>
                  <el-button type="primary" @click="changestation(scope.row.pigid)">确 定</el-button>
                </div>
              </el-dialog>
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
  changestation
} from '../../../api/request'

export default {
  name: 'changestation',
  data () {
    return {
      options: [],
      station_options: [],
      existpigs: [],
      dialogFormVisible: false,
      newstation: [],
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
      // console.log(id)
      getStationPig({ id: id }).then(res => {
        // console.log(res)
        this.existpigs = res.data.stationpig
      })
    },
    close () {
      this.dialogFormVisible = false
      this.$message({
        type: 'info',
        message: '已取消转栏'
      })
    },
    change () {
      this.dialogFormVisible = true
    },
    changestation (pigid) {
      changestation({ newstation: this.newstation, pigid: pigid }).then(res => {
        console.log(res)
        this.dialogFormVisible = false
        getStationPig({ id: this.pig_stationid }).then(res => {
          // console.log(res)
          this.existpigs = res.data.stationpig
        })
      })
      this.$message({
        type: 'success',
        message: '转栏成功'
      })
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
  max-width: 202px;
}
.date-picker{
  max-width: 202px !important;
  width: auto;
}
.el-input{
  width: auto;
}
</style>
