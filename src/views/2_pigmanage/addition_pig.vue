<template>
  <div>
    <bread bigtitle="母猪管理" smalltitle="入栏" icon="el-icon-magic-stick"></bread>
    <div class="container">
      <AddPigForm @GetPigs="GetPigs"></AddPigForm>
<!--      <el-row :gutter="20">-->
<!--        <el-col :span="6">-->
<!--          <StationSelect @StationChange="PigChange"></StationSelect>-->
<!--        </el-col>-->
<!--        <el-col :span="6">-->
<!--          <el-input-->
<!--            placeholder="请输入身份码"-->
<!--            v-model.number="addpig.pigid"-->
<!--            maxlength="15"-->
<!--            show-word-limit-->
<!--          >-->
<!--          </el-input>-->
<!--        </el-col>-->
<!--        <el-col :span="6">-->
<!--          <el-input-->
<!--            placeholder="请输入耳标号"-->
<!--            v-model.number="addpig.earid"-->
<!--            maxlength="8"-->
<!--            show-word-limit-->
<!--          >-->
<!--          </el-input>-->
<!--        </el-col>-->
<!--      </el-row>-->
<!--      <el-row :gutter="20">-->
<!--        <el-col :span="6">-->
<!--          <template>-->
<!--            <div class="block">-->
<!--              <span class="demonstration"></span>-->
<!--              <el-date-picker-->
<!--                class="date-picker"-->
<!--                value-format="yyyy-MM-dd"-->
<!--                v-model="addpig.breedtime"-->
<!--                type="date"-->
<!--                :picker-options="pickerOptions"-->
<!--                placeholder="选择配种日期">-->
<!--              </el-date-picker>-->
<!--            </div>-->
<!--          </template>-->
<!--        </el-col>-->
<!--        <el-col :span="6">-->
<!--          <el-input placeholder="请输入品种" v-model="addpig.kind">-->
<!--          </el-input>-->
<!--        </el-col>-->
<!--        <el-col :span="6">-->
<!--          <el-input-->
<!--            placeholder="请输入与配公猪号"-->
<!--            v-model.number="addpig.malepignum"-->
<!--            maxlength="15"-->
<!--            show-word-limit-->
<!--          >-->
<!--          </el-input>-->
<!--        </el-col>-->
<!--      </el-row>-->
<!--      <el-row :gutter="20">-->
<!--        <el-col :span="6">-->
<!--          <el-input-->
<!--            placeholder="请输入背膘厚"-->
<!--            v-model="addpig.backfat">-->
<!--          </el-input>-->
<!--        </el-col>-->
<!--        <el-col :span="6">-->
<!--          <el-input-->
<!--            placeholder="请输入胎龄"-->
<!--            v-model.number="addpig.gesage"-->
<!--            maxlength="2"-->
<!--            show-word-limit>-->
<!--          </el-input>-->
<!--        </el-col>-->
<!--        <el-col :span="6">-->
<!--          <el-select-->
<!--            placeholder="请选择疫苗情况"-->
<!--            v-model="addpig.vaccine"-->
<!--            multiple-->
<!--            collapse-tags-->
<!--            clearable-->
<!--            filterable-->
<!--            allow-create>-->
<!--            <el-option-->
<!--              v-for="item in vaccine_options"-->
<!--              :key="item.value"-->
<!--              :label="item.label"-->
<!--              :value="item.value">-->
<!--            </el-option>-->
<!--          </el-select>-->
<!--        </el-col>-->
<!--        <el-col :span="6">-->
<!--          <el-button type="primary" @click="addpigs">入栏</el-button>-->
<!--        </el-col>-->
<!--      </el-row>-->
      <el-table :data="existpigs">
        <el-table-column label="饲喂站号"
                         prop="stationid"
                         align="center"
                         :filters="[{text: '01-01-0001', value: '01-01-0001'},
                         {text: '01-01-0002', value: '01-01-0002'},
                         {text: '01-01-0003', value: '01-01-0003'},
                         {text: '01-01-0004', value: '01-01-0004'}]"
                         :filter-method="filterHandler"
                         width="120px"></el-table-column>
        <el-table-column label="母猪号" prop="pigid" align="center" width="160px"></el-table-column>
        <el-table-column label="母猪耳标号" prop="earid" align="center"></el-table-column>
        <el-table-column label="母猪品种" prop="pigkind" align="center" width="100px"></el-table-column>
        <el-table-column label="与配公猪号" prop="malepignum" align="center" width="160px"></el-table-column>
        <el-table-column label="公猪品种" prop="" align="center" width="100px"></el-table-column>
        <el-table-column label="配种日期" prop="breedtime" align="center"></el-table-column>
        <el-table-column label="背膘厚/mm" prop="backfat" align="center" width="120px"></el-table-column>
        <el-table-column label="胎龄" prop="gesage" align="center" width="120px"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="change(scope.row)">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getStationPig } from '../../api/request'

import bread from '../../components/common/bread'
import AddPigForm from '../../components/common/AddPigForm'

export default {
  name: 'addition_pig',
  data () {
    return {
      existpigs: []
    }
  },
  components: {
    bread,
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
  .el-table {
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
