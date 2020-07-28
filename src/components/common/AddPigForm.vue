<template>
  <div class="handle-box">
    <el-row class="row-bg" :gutter="120">
      <el-col :span="18">
        <el-form
          ref="ValidateForm"
          label-width="160px"
          :model="NewPig"
          :rules="rules"
          label-position="right"
          hide-required-asterisk>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="母猪区号：">
                <StationSelect @StationChange="StationChange"></StationSelect>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="饲喂站号：">
                <el-input v-model="NewPig.StationId"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="母猪号：">
                <el-input v-model="NewPig.PigId"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="电子耳标：">
                <el-input v-model="NewPig.EarId"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="与配公猪号：">
                <el-input v-model="NewPig.MalePigId"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="配种日期：">
                <el-date-picker
                  class="date-picker"
                  v-model="NewPig.BreedTime"
                  value-format="yyyy-MM-dd"
                  type="date"
                  :picker-options="pickerOptions"
                  placeholder="选择配种日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="背膘厚：">
                <el-input v-model="NewPig.BackFat"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="胎龄：">
                <el-input v-model="NewPig.GestationalAge"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6" :offset="1">
              <el-form-item>
                <el-button icon="el-icon-check" type="primary" @click="addpigs">入栏</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-col>
      <el-col :span="6">
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
          accept=".xlsx">
          <i class="el-icon-plus"></i>
          <div slot="tip" class="el-upload__tip">请选择excel文件，一键入栏</div>
        </el-upload>
      </el-col>
    </el-row>
    <!--    <el-row :gutter="20">-->
    <!--      <el-col :span="6">-->
    <!--        <StationSelect @StationChange="PigChange"></StationSelect>-->
    <!--      </el-col>-->
    <!--      <el-col :span="6">-->
    <!--        <el-input-->
    <!--          placeholder="请输入身份码"-->
    <!--          v-model.number="addpig.pigid"-->
    <!--          maxlength="15"-->
    <!--          show-word-limit-->
    <!--        >-->
    <!--        </el-input>-->
    <!--      </el-col>-->
    <!--      <el-col :span="6">-->
    <!--        <el-input-->
    <!--          placeholder="请输入耳标号"-->
    <!--          v-model.number="addpig.earid"-->
    <!--          maxlength="8"-->
    <!--          show-word-limit-->
    <!--        >-->
    <!--        </el-input>-->
    <!--      </el-col>-->
    <!--    </el-row>-->
    <!--    <el-row :gutter="20">-->
    <!--      <el-col :span="6">-->
    <!--        <template>-->
    <!--          <div class="block">-->
    <!--            <span class="demonstration"></span>-->
    <!--            <el-date-picker-->
    <!--              class="date-picker"-->
    <!--              value-format="yyyy-MM-dd"-->
    <!--              v-model="addpig.breedtime"-->
    <!--              type="date"-->
    <!--              :picker-options="pickerOptions"-->
    <!--              placeholder="选择配种日期">-->
    <!--            </el-date-picker>-->
    <!--          </div>-->
    <!--        </template>-->
    <!--      </el-col>-->
    <!--      <el-col :span="6">-->
    <!--        <el-input placeholder="请输入品种" v-model="addpig.kind">-->
    <!--        </el-input>-->
    <!--      </el-col>-->
    <!--      <el-col :span="6">-->
    <!--        <el-input-->
    <!--          placeholder="请输入与配公猪号"-->
    <!--          v-model.number="addpig.malepignum"-->
    <!--          maxlength="15"-->
    <!--          show-word-limit-->
    <!--        >-->
    <!--        </el-input>-->
    <!--      </el-col>-->
    <!--    </el-row>-->
    <!--    <el-row :gutter="20">-->
    <!--      <el-col :span="6">-->
    <!--        <el-input-->
    <!--          placeholder="请输入背膘厚"-->
    <!--          v-model="addpig.backfat">-->
    <!--        </el-input>-->
    <!--      </el-col>-->
    <!--      <el-col :span="6">-->
    <!--        <el-input-->
    <!--          placeholder="请输入胎龄"-->
    <!--          v-model.number="addpig.gesage"-->
    <!--          maxlength="2"-->
    <!--          show-word-limit>-->
    <!--        </el-input>-->
    <!--      </el-col>-->
    <!--      <el-col :span="6">-->
    <!--        <el-button type="primary" @click="addpigs">入栏</el-button>-->
    <!--      </el-col>-->
    <!--    </el-row>-->
  </div>
</template>

<script>
import StationSelect from './StationSelect'

export default {
  name: 'AddPigForm',
  components: {
    StationSelect
  },
  data () {
    return {
      NewPig: {
        Build_Unit: '',
        StationId: '',
        PigId: '',
        EarId: '',
        MalePigId: '',
        BreedTime: '',
        BackFat: '',
        GestationalAge: ''
      },
      rules: {},
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() > Date.now()
        }
      }
    }
  },
  methods: {
    StationChange () {
      console.log(123)
    },
    addpigs () {
      console.log('入栏')
    }
  }
}
</script>

<style scoped>
  .handle-box {
    margin-top: 10px;
    margin-bottom: 20px;
  }

  .el-input {
    width: 210px;
  }
</style>
