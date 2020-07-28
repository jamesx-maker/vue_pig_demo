<template>
  <div class="handle-box">
    <el-form
      :inline="true"
      :model="NewStation"
      ref="ValidateForm"
      :rules="rules"
      hide-required-asterisk>
      <el-form-item label="栋号：" prop="Building">
        <el-input
          v-model.number="NewStation.Building"
          placeholder="请输入栋号"
          maxlength="2"
          show-word-limit
        ></el-input>
      </el-form-item>
      <el-form-item label="单元号：" prop="Unit">
        <el-input
          v-model.number="NewStation.Unit"
          placeholder="请输入单元号"
          maxlength="2"
          show-word-limit
        ></el-input>
      </el-form-item>
      <el-form-item label="饲喂站号：" prop="StationId">
        <el-input
          v-model.number="NewStation.StationId"
          placeholder="请输入饲喂站号"
          maxlength="4"
          show-word-limit
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-check"
          @click="handleAddition('ValidateForm')"
        >添加</el-button>
      </el-form-item>
    </el-form>
    <!--          <el-row :gutter="20">-->
    <!--            <el-col :span="6">-->
    <!--              <el-input v-model.number="query.room"-->
    <!--                        placeholder="请输入单元号"-->
    <!--                        maxlength="2"-->
    <!--                        show-word-limit-->
    <!--                        class="handle-input mr10">-->
    <!--              </el-input>-->
    <!--            </el-col>-->
    <!--            <el-col :span="6">-->
    <!--              <el-input-->
    <!--                v-model.number="query.station_id"-->
    <!--                placeholder="饲喂站号"-->
    <!--                maxlength="4"-->
    <!--                show-word-limit-->
    <!--                class="handle-input mr10"-->
    <!--              ></el-input>-->
    <!--            </el-col>-->
    <!--            <el-col :span="6">-->
    <!--              <el-button-->
    <!--          type="primary"-->
    <!--          icon="el-icon-check"-->
    <!--          @click="handleAddition"-->
    <!--        >添加</el-button>-->
    <!--            </el-col>-->
    <!--          </el-row>-->
  </div>
</template>

<script>
export default {
  name: 'AddStationForm',
  data () {
    return {
      NewStation: {
        Building: '',
        Unit: '',
        StationId: ''
      },
      rules: {
        Building: [
          { required: true, message: '栋号不能为空', trigger: 'blur' },
          { type: 'number', message: '栋号必须为数字值' }
        ],
        Unit: [
          { required: true, message: '单元号不能为空', trigger: 'blur' },
          { type: 'number', message: '单元号必须为数字值' }
        ],
        StationId: [
          { required: true, message: '饲喂站号不能为空', trigger: 'blur' },
          { type: 'number', message: '饲喂站号必须为数字值' }
        ]
      }
    }
  },
  computed: {
    SendNewStation () {
      const Building = this.formatZero(this.NewStation.Building, 2)
      const Unit = this.formatZero(this.NewStation.Unit, 2)
      const StationId = this.formatZero(this.NewStation.StationId, 4)
      return Building + '-' + Unit + '-' + StationId
    }
  },
  methods: {
    // 高位补0函数
    formatZero (num, len) {
      if (String(num).length > len) {
        return num
      }
      return (Array(len).join(0) + num).slice(-len)
    },
    handleAddition (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$emit('AddNewStation', this.SendNewStation)
          console.log(this.SendNewStation)
          this.NewStation = {}
        } else {
          this.$message({
            message: '输入有误,请重新输入',
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
  .el-form-item{
    margin-right: 30px;
  }

</style>
