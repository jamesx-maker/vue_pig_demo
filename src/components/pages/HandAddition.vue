<template>
  <div>
    <div style="height: 210px;margin-top: 30px;">
      <AddPigForm @GetPigs="GetPigs"></AddPigForm>
    </div>
    <el-table :data="existpigs">
      <el-table-column label="饲喂站号"
                       prop="stationid"
                       align="center"
                       :filters="[{text: '01-01-0001', value: '01-01-0001'},
                                  {text: '01-01-0002', value: '01-01-0002'},
                                  {text: '01-01-0003', value: '01-01-0003'},
                                  {text: '01-01-0004', value: '01-01-0004'}
                                  ]"
                       :filter-method="filterHandler"
                       width="120px"></el-table-column>
      <el-table-column label="母猪号" prop="pigid" align="center" width="160px"></el-table-column>
      <el-table-column label="电子耳标号" prop="earid" align="center" width="160px"></el-table-column>
      <el-table-column label="母猪品种" prop="pigkind" align="center"></el-table-column>
      <el-table-column label="与配公猪号" prop="malepignum" align="center" width="160px"></el-table-column>
      <el-table-column label="公猪品种" prop="" align="center" width="100px"></el-table-column>
      <el-table-column label="配种时间" prop="breedtime" align="center" width="95px"></el-table-column>
      <el-table-column label="背膘厚/mm" prop="backfat" align="center" width="120px"></el-table-column>
      <el-table-column label="胎龄" prop="gesage" align="center" width="120px"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="change(scope.row)">修订</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getStationPig } from '../../api/request'
import AddPigForm from '../../components/form/AddPigForm'
export default {
  name: 'hand_addition',
  data () {
    return {
      existpigs: []
    }
  },
  components: {
    AddPigForm
  },
  methods: {
    async GetPigs (StationId) {
      const res = await getStationPig({ StationId: StationId })
      this.existpigs = res.data.stationpig
    },
    change () {
      console.log('修改')
    },
    filterHandler (value, row, column) {
      const property = column.property
      console.log(value)
      // console.log(row)
      // console.log(column.property)
      return row[property] === value
    }
  }
}
</script>

<style scoped>
  .el-table{
    margin-top: 10px;
  }
  .el-col {
    margin-top: 10px;
  }

  .el-select {
    width: 210px;
  }

  .date-picker {
    width: 210px;
  }
  .el-input {
    width: 210px;
  }
</style>
