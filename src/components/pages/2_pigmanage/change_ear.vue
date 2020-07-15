<template>
    <div>
      <div class="crumbs">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>
            <i class="el-icon-magic-stick"></i> 母猪管理
          </el-breadcrumb-item>
          <el-breadcrumb-item>更换耳标</el-breadcrumb-item>
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
          <el-table-column label="原耳标号" prop="earid" align="center"></el-table-column>
          <el-table-column label="品种" prop="pigkind" align="center"></el-table-column>
          <el-table-column label="设置新耳标号" prop="setearid" align="center">
            <template slot-scope="scope">
              <el-button size="mini" type="danger" @click="change">更换耳标</el-button>
              <el-dialog title="输入新耳标号" :visible.sync="dialogFormVisible" width="400px">
                <el-input v-model.number="newearid" placeholder="输入新耳标号"></el-input>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="close">取 消</el-button>
                  <el-button type="primary" @click="changeearid(scope.row.pigid)">确 定</el-button>
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
  getStationPig
} from '../../../api/request'

export default {
  name: 'change_ear',
  data () {
    return {
      newearid: '',
      station_options: [],
      dialogFormVisible: false,
      existpigs: [],
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
    changeearid (pigid) {
      if (typeof (this.newearid) === 'number') {
        this.dialogFormVisible = false
        this.$message({
          type: 'success',
          message: '更换成功'
        })
      } else {
        this.$message({
          type: 'warning',
          message: '耳标号输入错误,请重新输入'
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
    width: auto;
    max-width: 202px;
  }
</style>
