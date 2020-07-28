<template>
  <div>
    <bread bigtitle="母猪管理" smalltitle="入栏" icon="el-icon-magic-stick"></bread>
    <div class="container">
      <el-row :gutter="20">
        <el-col :span="6">
          <StationSelect @StationChange="PigChange"></StationSelect>
        </el-col>
        <el-col :span="6">
          <el-input
            placeholder="请输入身份码"
            v-model.number="addpig.pigid"
            maxlength="15"
            show-word-limit
          >
          </el-input>
        </el-col>
        <el-col :span="6">
          <el-input
            placeholder="请输入耳标号"
            v-model.number="addpig.earid"
            maxlength="8"
            show-word-limit
          >
          </el-input>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <template>
            <div class="block">
              <span class="demonstration"></span>
              <el-date-picker
                class="date-picker"
                value-format="yyyy-MM-dd"
                v-model="addpig.breedtime"
                type="date"
                :picker-options="pickerOptions"
                placeholder="选择配种日期">
              </el-date-picker>
            </div>
          </template>
        </el-col>
        <el-col :span="6">
          <el-input placeholder="请输入品种" v-model="addpig.kind">
          </el-input>
        </el-col>
        <el-col :span="6">
          <el-input
            placeholder="请输入与配公猪号"
            v-model.number="addpig.malepignum"
            maxlength="15"
            show-word-limit
          >
          </el-input>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-input
            placeholder="请输入背膘厚"
            v-model="addpig.backfat">
          </el-input>
        </el-col>
        <el-col :span="6">
          <el-input
            placeholder="请输入胎龄"
            v-model.number="addpig.gesage"
            maxlength="2"
            show-word-limit>
          </el-input>
        </el-col>
        <el-col :span="6">
          <el-select
            placeholder="请选择疫苗情况"
            v-model="addpig.vaccine"
            multiple
            collapse-tags
            clearable
            filterable
            allow-create>
            <el-option
              v-for="item in vaccine_options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" @click="addpigs">入栏</el-button>
        </el-col>
      </el-row>
      <el-table :data="existpigs" border>
        <el-table-column label="饲喂站号" prop="stationid" align="center" width="120px"></el-table-column>
        <el-table-column label="品种" prop="pigkind" align="center" width="120px"></el-table-column>
        <el-table-column label="身份码" prop="pigid" align="center" width="140px"></el-table-column>
        <el-table-column label="耳标号" prop="earid" align="center"></el-table-column>
        <el-table-column label="与配公猪号" prop="malepignum" align="center"></el-table-column>
        <el-table-column label="配种日期" prop="breedtime" align="center"></el-table-column>
        <el-table-column label="背膘厚/mm" prop="backfat" align="center"></el-table-column>
        <el-table-column label="胎龄" prop="gesage" align="center"></el-table-column>
        <el-table-column label="已注射疫苗" prop="vaccine" align="center"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import {
  getStationPig,
  additionpig
} from '../../../api/request'

import bread from '../../common/bread'
import StationSelect from '../../common/StationSelect'

export default {
  name: 'addition_pig',
  data () {
    return {
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() > Date.now()
        }
      },
      vaccine_options: [
        {
          value: '疫苗1',
          label: '疫苗1'
        },
        {
          value: '疫苗2',
          label: '疫苗2'
        },
        {
          value: '疫苗3',
          label: '疫苗3'
        },
        {
          value: '疫苗4',
          label: '疫苗4'
        },
        {
          value: '疫苗5',
          label: '疫苗5'
        },
        {
          value: '疫苗6',
          label: '疫苗6'
        },
        {
          value: '疫苗7',
          label: '疫苗7'
        },
        {
          value: '疫苗8',
          label: '疫苗8'
        }
      ],
      existpigs: [],
      addpig: {},
      NowStationId: ''
    }
  },
  components: {
    bread,
    StationSelect
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
    addpigs () {
      if (this.addpig.vaccine.length === 0) {
        this.addpig.vaccine = ['暂无']
      } else {
        this.addpig.vaccine.join(',')
      }
      this.addpig.pigid = this.formatZero(this.addpig.pigid, 15)
      this.addpig.earid = this.formatZero(this.addpig.earid, 8)
      this.addpig.malepignum = this.formatZero(this.addpig.malepignum, 8)
      this.addpig.pig_stationid = this.NowStationId
      additionpig(this.addpig).then((res) => {
        if (res.status === 201) {
          this.$message.warning(res.data.code)
        } else {
          this.GetPigs()
          this.addpig = {}
          this.$message.success(res.data.code)
        }
      })
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
