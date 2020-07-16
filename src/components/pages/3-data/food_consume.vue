<template>
  <div>
    <bread bigtitle="数据查询" smalltitle="饲料消耗" icon="el-icon-s-data"></bread>
    <div class="container">
      <div>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-select
              v-model="pig_stationid"
              placeholder="请选择饲喂站"
              @change="getstationpig(pig_stationid)"
              filterable
              clearable>
              <el-option
                v-for="item in station_options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="6">
            <el-input placeholder="请输入耳标号">
            </el-input>
          </el-col>
          <el-col :span="6">
            <el-date-picker
              v-model="datavalue"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions">
            </el-date-picker>
          </el-col>
          <el-col :span="6">
            <el-button type="primary" >查询</el-button>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import bread from '../../common/bread'
export default {
  name: 'food_consume',
  components: {
    bread
  },
  data () {
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: '本周',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * end.getDay())
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '上周',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * (end.getDay() + 7))
              end.setTime(end.getTime() - 3600 * 1000 * 24 * end.getDay())
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一周',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      pig_stationid: '',
      station_options: [],
      datavalue: ''
    }
  },
  created () {
  }
}
</script>

<style scoped>
  .el-select{
    width: 210px;
  }
  .el-input{
    width: 210px;
  }
</style>
