<template>
  <div class="handle-box">
    <el-form
      ref="ValidateForm"
      label-width="160px"
      :model="NewPig"
      :rules="rules"
      label-position="right"
      hide-required-asterisk>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="饲喂站号：" prop="Build_Unit_StationId">
            <StationSelect @StationChange="StationChange"><span></span></StationSelect>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="母猪号：" prop="PigId">
            <el-input
              v-model.number="NewPig.PigId"
              maxlength="15"
              placeholder="请输入母猪号"
              show-word-limit></el-input>
          </el-form-item>
<!--              <el-form-item label="饲喂站号：">-->
<!--                <el-input v-model="NewPig.StationId"></el-input>-->
<!--              </el-form-item>-->
        </el-col>
        <el-col :span="8">
          <el-form-item label="母猪电子耳标：" prop="EarId">
            <el-input
              v-model.number="NewPig.EarId"
              maxlength="8"
              placeholder="请输入母猪电子耳标"
              show-word-limit></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
        </el-col>
        <el-col :span="8">
          <el-form-item label="与配公猪号：" prop="MalePigId">
            <el-input
              v-model.number="NewPig.MalePigId"
              maxlength="15"
              placeholder="请输入与配公猪号"
              show-word-limit></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="配种时间：" prop="BreedTime">
            <el-date-picker
              class="date-picker"
              v-model="NewPig.BreedTime"
              format="yyyy-MM-dd HH:mm"
              value-format="yyyy-MM-dd HH:mm"
              type="datetime"
              :picker-options="pickerOptions"
              placeholder="请选择配种时间">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="背膘厚：" prop="BackFat">
            <el-input v-model.number="NewPig.BackFat"
                      placeholder="请输入背膘厚"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="胎龄：" prop="GestationalAge">
            <el-input
              v-model.number="NewPig.GestationalAge"
              maxlength="2"
              placeholder="请输入胎龄"
              show-word-limit></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="1">
          <el-form-item>
            <el-button icon="el-icon-check" type="primary" @click="addpigs('ValidateForm')">入栏</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
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
import StationSelect from '../common/StationSelect'
import { formatZero } from '../../static/func'
import { additionpig } from '../../api/request'

export default {
  name: 'AddPigForm',
  components: {
    StationSelect
  },
  data () {
    return {
      NewPig: {
        Build_Unit_StationId: '',
        PigId: '',
        EarId: '',
        MalePigId: '',
        BreedTime: '',
        BackFat: '',
        GestationalAge: ''
      },
      rules: {
        Build_Unit_StationId: [
          { required: true, message: '饲喂站号不能为空', trigger: 'blur' }
        ],
        PigId: [
          { required: true, message: '母猪号不能为空', trigger: 'blur' },
          { type: 'number', message: '母猪号必须为数字值', trigger: 'blur' }
        ],
        EarId: [
          { required: true, message: '母猪电子耳标不能为空', trigger: 'blur' },
          { type: 'number', message: '母猪电子耳标必须为数字值', trigger: 'blur' }
        ],
        MalePigId: [
          { required: true, message: '与配公猪号不能为空', trigger: 'blur' },
          { type: 'number', message: '与配公猪号必须为数字值', trigger: 'blur' }
        ],
        BreedTime: [
          { required: true, message: '配种日期不能为空', trigger: 'blur' }
        ],
        BackFat: [],
        GestationalAge: [
          { required: true, message: '胎龄不能为空', trigger: 'blur' },
          { type: 'number', message: '胎龄必须为数字值', trigger: 'blur' }
        ]
      },
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() > Date.now()
        }
      }
    }
  },
  computed: {
    SendPig () {
      return {
        Build_Unit_StationId: this.NewPig.Build_Unit_StationId,
        PigId: formatZero(this.NewPig.PigId, 15),
        EarId: formatZero(this.NewPig.EarId, 8),
        MalePigId: formatZero(this.NewPig.MalePigId, 15),
        BreedTime: this.NewPig.BreedTime,
        BackFat: this.NewPig.BackFat,
        GestationalAge: this.NewPig.GestationalAge
      }
    }
  },
  methods: {
    StationChange (StationId) {
      this.NewPig.Build_Unit_StationId = StationId
      this.$emit('GetPigs', this.NewPig.Build_Unit_StationId)
    },
    addpigs (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          additionpig(this.SendPig).then((res) => {
            if (res.status === 201) {
              this.$message.warning(res.data.code)
            } else {
              console.log(this.NewPig.Build_Unit_StationId)
              this.$emit('GetPigs', this.NewPig.Build_Unit_StationId)
              this.NewPig = {
                Build_Unit_StationId: this.NewPig.Build_Unit_StationId,
                PigId: '',
                EarId: '',
                MalePigId: '',
                BreedTime: '',
                BackFat: '',
                GestationalAge: ''
              }
              this.$message.success(res.data.code)
            }
          })
        } else {
          this.$message({
            message: '请输入正确的入栏参数',
            type: 'error'
          })
          return false
        }
      })
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
