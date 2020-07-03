<template>
  <div>
    <!--      搜索与添加区域-->
    <el-row :gutter="20">
      <el-col :span="6">
        <el-select v-model="addpig.pig_stationid_id" placeholder="请选择饲喂站" @change="getstationpig(addpig.pig_stationid_id)">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="10">
        <el-input placeholder="请输入耳标号">
        </el-input>
        <el-button type="primary" >查询</el-button>
      </el-col>
    </el-row>
    <!--    饲喂站列表区域-->
    <el-table border>
      <el-table-column type="index"></el-table-column>
      <el-table-column label="身份码" ></el-table-column>
      <el-table-column label="胎龄" ></el-table-column>
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
</template>

<script>
export default {
  name: 'intakedata',
  data () {
    return {
      options: [],
      stationpigs: [],
      addpig: {
        pig_stationid_id: ''
      }
    }
  },
  created () {
    this.getstationid()
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
    }
  }
}
</script>

<style scoped>
.el-select{
  width: 256px;
}
.el-input{
  width: 256px;
}
.el-button{
  margin-left: 20px;
}
</style>
