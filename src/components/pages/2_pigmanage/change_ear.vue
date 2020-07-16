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
          <el-table-column label="设置新耳标号" align="center">
            <template slot-scope="scope">
              <el-button size="mini" type="danger" @click="change(scope.row.pigid)">更换耳标</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-dialog title="输入新耳标号" :visible.sync="dialogFormVisible" width="400px"  style="margin-left: 80px">
          <el-input
            v-model.number="newearid"
            placeholder="输入新耳标号"
            maxlength="12"
            show-word-limit
          ></el-input>
          <div slot="footer" class="dialog-footer">
            <el-button @click="close">取 消</el-button>
            <el-button type="primary" @click="changeearid">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
</template>

<script>
import {
  getstation,
  getStationPig,
  changeearid
} from '../../../api/request'

export default {
  name: 'change_ear',
  data () {
    return {
      newearid: '',
      station_options: [],
      dialogFormVisible: false,
      existpigs: [],
      pig_stationid: '',
      sendpigid: ''
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
    change (pigid) {
      // console.log(pigid)
      this.sendpigid = pigid
      this.dialogFormVisible = true
    },
    changeearid () {
      // console.log(this.newearid)
      if (typeof (this.newearid) === 'number') {
        changeearid({ newearid: this.newearid, pigid: this.sendpigid }).then(res => {
          // console.log(res)
          getStationPig({ id: this.pig_stationid }).then(res => {
            // console.log(res)
            this.existpigs = res.data.stationpig
          })
        })
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
    width: 210px;
  }
</style>
