<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-magic-stick"></i> 母猪管理
        </el-breadcrumb-item>
        <el-breadcrumb-item>入栏</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-select v-model="addpig.pig_stationid"
                     clearable
                     placeholder="请选择饲喂站"
                     @change="getstationpig(addpig.pig_stationid)"
                     size="250px">
            <el-option
              v-for="item in station_options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
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
            maxlength="12"
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
            v-model="addpig.malepignum"
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
            v-model.number="addpig.backfat">
          </el-input>
        </el-col>
        <el-col :span="6">
          <el-input placeholder="请输入胎龄" v-model="addpig.gesage">
          </el-input>
        </el-col>
        <el-col :span="6">
          <el-select
            placeholder="请选择疫苗情况"
            v-model="addpig.vaccine"
            multiple
            collapse-tags>
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
        <el-table-column label="饲喂站号" prop="stationid" align="center"></el-table-column>
        <el-table-column label="品种" prop="pigkind" align="center"></el-table-column>
        <el-table-column label="身份码" prop="pigid" align="center"></el-table-column>
        <el-table-column label="耳标号" prop="earid" align="center"></el-table-column>
        <el-table-column label="与配公猪号" prop="malepignum" align="center"></el-table-column>
        <el-table-column label="配种日期" prop="breedtime" align="center"></el-table-column>
        <el-table-column label="背膘厚" prop="backfat" align="center"></el-table-column>
        <el-table-column label="胎龄" prop="gesage" align="center"></el-table-column>
        <el-table-column label="品种" prop="kind" align="center"></el-table-column>
        <el-table-column label="疫苗情况" prop="vaccine" align="center"></el-table-column>
        <!--      <el-table-column label="操作" width="80px">-->
        <!--        <template slot-scope="scope">-->
        <!--          <el-button size="mini" type="danger" @click="decpigs(scope.row.stationid,scope.row.pigid)">出栏</el-button>-->
        <!--        </template>-->
        <!--      </el-table-column>-->
      </el-table>
    </div>
  </div>
</template>

<script>
import { getstation, querypig, additionpig } from '../../../api/request'

export default {
  name: 'addition_pig',
  data () {
    return {
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() > Date.now()
        }
      },
      station_options: [],
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
        }
      ],
      existpigs: [],
      addpig: {
        pig_stationid: '',
        pigid: '',
        earid: '',
        kind: '',
        malepignum: '',
        backfat: '',
        gesage: '',
        vaccine: '',
        breedtime: ''
      }
    }
  },
  methods: {
    getstationid () {
      getstation().then((res) => {
        console.log(res)
        // this.options.splice(0)
        // for (let i = 0; i < res.data.id.length; i++) {
        //   this.options.push({
        //     value: res.data.id[i],
        //     label: res.data.id[i]
        //   })
        // }
      })
    },
    getstationpig (id) {
      querypig(id).then((res) => {
        console.log(res)
        // this.stationpigs.splice(0)
        // const result = JSON.parse(res.data.pigs)
        // for (const i in result) {
        //   this.stationpigs.push(result[i].fields)
        // }
      })
    },
    addpigs () {
      additionpig(this.addpig).then((res) => {
        console.log(res)
        // this.$message.success(res.data.message)
        // console.log(res)
        // this.getstationpig(this.addpig.pig_stationid_id)
        // this.addpig.malepignum = ''
        // this.addpig.pigid = ''
        // this.addpig.backfat = ''
        // this.addpig.gesage = ''
        // this.addpig.vaccine = ''
        // this.addpig.earid = ''
        // this.addpig.kind = ''
        // this.addpig.breedtime = ''
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
    max-width: 206.4px;
  }
  .date-picker{
    max-width: 206.4px !important;
    width: auto;
  }
  .el-input{
    width: auto;
  }
</style>
