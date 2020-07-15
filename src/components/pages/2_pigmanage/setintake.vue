<template>
    <div>
      <div class="crumbs">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>
            <i class="el-icon-magic-stick"></i> 母猪管理
          </el-breadcrumb-item>
          <el-breadcrumb-item>下料设置</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="container">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-select v-model="pig_stationid"
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
          <el-table-column label="背膘厚/mm" prop="backfat" align="center"></el-table-column>
          <el-table-column label="妊娠天数" prop="" align="center"></el-table-column>
          <el-table-column label="默认采食量/kg" prop="" align="center"></el-table-column>
          <el-table-column label="推荐采食量/kg" prop="" align="center"></el-table-column>
          <el-table-column label="修订采食量/kg" align="center">
            <template slot-scope="scope">
              <el-input placeholder="请输入采食量" v-model="scope.row.setnum"></el-input>
              <el-button
                style="margin-left: 15px"
                type="success"
                icon="el-icon-check"
                size="mini"
                circle
                @click="setintake(scope.row.pigid)"
              ></el-button>
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
  name: 'setintake',
  data () {
    return {
      station_options: [],
      existpigs: [],
      pig_stationid: '',
      stationpigs: [],
      setfeed: ''
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
    setintake (pigid) {}
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
  width: 120px;
}
</style>
