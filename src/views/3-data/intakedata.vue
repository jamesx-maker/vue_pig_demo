<template>
  <div>
    <bread bigtitle="数据查询" smalltitle="采食信息" icon="el-icon-s-data"></bread>
    <div class="container">
      <!--      搜索与添加区域-->
      <el-row :gutter="20">
        <el-col :span="6">
          <StationSelect @StationChange="PigChange"></StationSelect>
        </el-col>
        <el-col :span="6">
          <span>耳标号：</span>
          <el-input placeholder="请输入耳标号">
          </el-input>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" >查询</el-button>
        </el-col>
      </el-row>
      <!--    饲喂站列表区域-->
      <el-table border :data="existpigs">
        <el-table-column type="index"></el-table-column>
        <el-table-column label="身份码" ></el-table-column>
        <el-table-column label="耳标号" ></el-table-column>
        <el-table-column label="背膘厚" ></el-table-column>
        <el-table-column label="采食开始时间" ></el-table-column>
        <el-table-column label="采食结束时间" ></el-table-column>
        <el-table-column label="采食量" ></el-table-column>
        <el-table-column label="操作" >
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row"
              active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
          </template>
        </el-table-column>
      </el-table>
      <!--      分页区域-->
      <!--    <el-pagination>-->
      <!--      @size-change=""-->
      <!--      @current-change=""-->
      <!--      :current-page=""-->
      <!--      :page-sizes="[1, 2, 3]"-->
      <!--      :page-size="queryInfo.pagesize"-->
      <!--      layout="total, sizes, prev, pager, next, jumper"-->
      <!--      :total="total">-->
      <!--    </el-pagination>-->
    </div>
  </div>
</template>

<script>
import {
  getStationPig
} from '../../api/request'
import bread from '../../components/common/bread'
import StationSelect from '../../components/common/StationSelect'
export default {
  name: 'intakedata',
  components: {
    bread,
    StationSelect
  },
  data () {
    return {
      NowStationId: '',
      existpigs: []
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
    }
  }
}
</script>

<style scoped>
.el-col{
  margin-top: 10px;
}
.el-select{
  width: 210px;
}
.el-input{
  width: 210px;
}
.el-button{
  margin-left: 20px;
}
.el-table{
  margin-top: 10px;
}
</style>
