<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-s-data"></i> 数据查询
        </el-breadcrumb-item>
        <el-breadcrumb-item>采食信息</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <!--      搜索与添加区域-->
      <el-row :gutter="20">
        <el-col :span="6">
          <el-select
            v-model="pig_stationid"
            placeholder="请选择饲喂站"
            @change="getstationpig(pig_stationid)">
            <el-option
              v-for="item in station_options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="6">
          <el-input placeholder="请输入耳标号">
          </el-input>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" >查询</el-button>
        </el-col>
      </el-row>
      <!--    饲喂站列表区域-->
      <el-table border>
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
  getstation,
  getStationPig
} from '../../../api/request'

export default {
  name: 'intakedata',
  data () {
    return {
      station_options: [],
      pig_stationid: '',
      stationpigs: []
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
