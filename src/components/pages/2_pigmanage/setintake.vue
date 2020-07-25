<template>
  <div>
    <bread bigtitle="母猪管理" smalltitle="下料设置" icon="el-icon-magic-stick"></bread>
    <div class="container">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-select v-model="pig_stationid"
                     placeholder="请选择饲喂站"
                     @change="getstationintake(pig_stationid)"
                     size="250px"
                     filterable
          >
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
        <el-table-column label="耳标号" prop="earid" width="110px" align="center"></el-table-column>
        <el-table-column label="品种" prop="pigkind" width="110px" align="center"></el-table-column>
        <el-table-column label="背膘厚/mm" width="120px" align="center">
          <template slot-scope="scope">
            {{scope.row.backfat}}
            <el-button
              style="margin-left: 15px"
              type="primary"
              icon="el-icon-edit"
              size="mini"
              circle
              @click="set(scope.row.pigid)"
            ></el-button>
          </template>
        </el-table-column>
        <el-table-column label="妊娠天数" prop="breeddays" width="100px" align="center"></el-table-column>
        <el-table-column label="采食量/kg" prop="final_quantity" width="100px" align="center"></el-table-column>
        <el-table-column label="默认采食量/kg" prop="index_quantity" width="120px" align="center"></el-table-column>
        <el-table-column label="推荐采食量/kg" prop="algo_quantity" width="120px" align="center"></el-table-column>
        <el-table-column label="修订采食量/kg" align="center">
          <template slot-scope="scope">
            <el-input placeholder="请输入采食量" v-model="scope.row.setnum" class="input2"></el-input>
            <el-button
              style="margin-left: 15px"
              type="success"
              icon="el-icon-check"
              size="mini"
              circle
              @click="setintake(scope.row.pigid, scope.row.setnum)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="设置背膘厚" :visible.sync="dialogFormVisible" width="400px"  style="margin-left: 80px">
        <el-input
          v-model="newbackfat"
          placeholder="请输入背膘厚"
          class="input1"
        ></el-input>
        <div slot="footer" class="dialog-footer">
          <el-button @click="close">取 消</el-button>
          <el-button type="primary" @click="setbackfat">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  getstation,
  getintake,
  changebackfat,
  changeintake
} from '../../../api/request'
import bread from '../../common/bread'

export default {
  name: 'setintake',
  components: {
    bread
  },
  data () {
    return {
      station_options: [],
      existpigs: [],
      pig_stationid: '',
      stationpigs: [],
      newbackfat: '',
      setfeed: '',
      sendpigid: '',
      dialogFormVisible: false
    }
  },
  created () {
    getstation({ pageIndex: '空' }).then(res => {
      // console.log(res)
      this.station_options = res.data.station_options
    })
  },
  methods: {
    getstationintake (id) {
      getintake({ id: id }).then(res => {
        console.log(res)
        this.existpigs = res.data.stationpig
      })
    },
    set (pigid) {
      this.sendpigid = pigid
      this.dialogFormVisible = true
    },
    setbackfat () {
      if (this.newbackfat === '') {
        this.$message({
          type: 'warning',
          message: '输入错误,请重新输入'
        })
      } else {
        console.log(this.sendpigid)
        console.log(this.newbackfat)
        changebackfat({ pigid: this.sendpigid, backfat: this.newbackfat }).then(res => {
          console.log(res)
          getintake({ id: this.pig_stationid }).then(res => {
            console.log(res)
            this.existpigs = res.data.stationpig
          })
        })
        this.$message({
          type: 'success',
          message: '设置背膘厚成功!'
        })
        this.dialogFormVisible = false
      }
    },
    close () {
      this.dialogFormVisible = false
      this.$message({
        type: 'info',
        message: '已取消设置'
      })
    },
    setintake (pigid, setnum) {
      if (setnum === undefined) {
        this.$message({
          type: 'warning',
          message: '没有输入采食量'
        })
      } else {
        this.$confirm('此操作将修改母猪采食量,是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // console.log(setnum)
          // console.log(typeof (setnum))
          changeintake({ pigid: pigid, setnum: setnum }).then(res => {
            console.log(res)
            getintake({ id: this.pig_stationid }).then(res => {
              console.log(res)
              this.existpigs = res.data.stationpig
            })
          })
          this.$message({
            type: 'success',
            message: '设置采食量成功!'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消设置'
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
  width: auto;
  max-width: 202px;
}
.input1{
  width: 250px;
  margin-left: 55px;
}
.input2{
  width: 120px;
}
</style>
