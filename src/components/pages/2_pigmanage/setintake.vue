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
            <el-select v-model="addpig.pig_stationid_id"
                       placeholder="请选择饲喂站"
                       @change="getstationpig(addpig.pig_stationid_id)"
                       size="250px">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-table :data="stationpigs" border>
          <el-table-column type="index"></el-table-column>
          <el-table-column label="身份码" prop="pigid"></el-table-column>
          <el-table-column label="品种" prop="pigkind"></el-table-column>
          <el-table-column label="背膘厚/mm" prop="backfat"></el-table-column>
          <el-table-column label="胎龄" prop="gesage"></el-table-column>
          <el-table-column label="妊娠天数" prop=""></el-table-column>
          <el-table-column label="默认采食量/kg" prop=""></el-table-column>
          <el-table-column label="推荐采食量/kg" prop=""></el-table-column>
          <el-table-column label="修订采食量/kg">
            <template slot-scope="scope">
              <el-input placeholder="请输入" v-model="scope.row.setnum"></el-input>
              <el-button type="success"
                         icon="el-icon-edit"
                         size="mini"
                         circle
                         @click="decpigs(scope.row.stationid,scope.row.pigid)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
</template>

<script>
export default {
  name: 'setintake',
  data () {
    return {
      options: [],
      // stationid: '',
      stationpigs: [],
      setfeed: '',
      addpig: {
        pig_stationid_id: ''
      }
    }
  },
  created () {
    this.getstationid()
  },
  mounted () {
  },
  methods: {
    getstationid () {
      this.$http.get('getstationid/').then((res) => {
        // console.log
        this.options.splice(0)
        for (let i = 0; i < res.data.id.length; i++) {
          this.options.push({
            value: res.data.id[i],
            label: res.data.id[i]
          })
        }
      })
    },
    getstationpig (A) {
      this.$http.post('getstationpig/', A).then((res) => {
        this.stationpigs.splice(0)
        // console.log(res)
        const result = JSON.parse(res.data.pigs)
        // console.log(result)
        for (const i in result) {
          this.stationpigs.push(result[i].fields)
        }
        // console.log(this.stationpigs)
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
