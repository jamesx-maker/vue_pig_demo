<template>
  <div>
    <bread bigtitle="母猪管理" smalltitle="更换耳标" icon="el-icon-magic-stick"></bread>
    <div class="container">
      <el-row :gutter="20" class="row">
        <el-col :span="6">
          <StationSelect @StationChange="PigChange"></StationSelect>
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
  getStationPig,
  changeearid
} from '../../api/request'
import bread from '../../components/common/bread'
import StationSelect from '../../components/common/StationSelect'

export default {
  name: 'change_ear',
  components: {
    bread,
    StationSelect
  },
  data () {
    return {
      newearid: '',
      dialogFormVisible: false,
      existpigs: [],
      sendpigid: '',
      NowStationId: ''
    }
  },
  methods: {
    // 高位补0函数
    formatZero (num, len) {
      if (String(num).length > len) {
        return num
      }
      return (Array(len).join(0) + num).slice(-len)
    },
    async GetPigs () {
      const res = await getStationPig({ id: this.NowStationId })
      this.existpigs = res.data.stationpig
    },
    PigChange (StationId) {
      this.NowStationId = StationId
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
      // console.log(pigid)
      this.sendpigid = pigid
      this.dialogFormVisible = true
    },
    changeearid () {
      // console.log(this.newearid)
      if (typeof (this.newearid) === 'number') {
        const newearid = this.formatZero(this.newearid, 8)
        changeearid({ newearid: newearid, pigid: this.sendpigid }).then(res => {
          // console.log(res)
          this.GetPigs()
          this.$message({
            type: 'success',
            message: '更换成功'
          })
        })
        this.dialogFormVisible = false
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
