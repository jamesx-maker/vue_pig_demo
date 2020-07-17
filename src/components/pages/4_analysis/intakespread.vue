<template>
  <div>
    <bread bigtitle="统计分析" smalltitle="采食分布" icon="el-icon-data-line"></bread>
    <div class="container">
      <div>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-select
              v-model="roomid"
              placeholder="请选择单元号"
              @change="getroomid(roomid)"
              filterable
              clearable>
              <el-option
                v-for="item in room_options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="6">
            <el-select
              v-model="stationid"
              placeholder="请选择饲喂站"
              @change="getstationid(stationid)"
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
            <el-button type="primary" >查询</el-button>
          </el-col>
        </el-row>
      </div>
      <el-divider></el-divider>
      <div id="main" style="width: 95%;height:600px;margin-top: 30px"></div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import bread from '../../common/bread'

export default {
  name: 'intakespread',
  components: {
    bread
  },
  data () {
    return {
      echarts_option: {
        color: ['#3398DB'],
        title: {
          text: '采食分布分析',
          left: 'center'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['2', '4', '6', '8', '10', '12', '14', '16', '18', '20', '22', '24'],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLine: {
              symbol: ['none', 'arrow']
            },
            splitLine: {
              lineStyle: {
                type: 'dashed'
              }
            }
          }
        ],
        series: [
          {
            name: '采食量',
            type: 'bar',
            barWidth: '60%',
            data: [1.2, 1.7, 2.1, 2.3, 2.6, 3.0, 3.2, 2.9, 2.2, 1.5, 0.8, 0.3]
          }
        ]
      },
      roomid: '',
      stationid: '',
      station_options: [],
      room_options: []
    }
  },
  methods: {
    draw () {
      // 基于准备好的dom，初始化echarts实例
      const myChart = echarts.init(document.getElementById('main'))
      // 指定图表的配置项和数据
      myChart.setOption(this.echarts_option)
    }
  },
  mounted () {
    this.draw()
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
