<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-data-line"></i> 统计分析
        </el-breadcrumb-item>
        <el-breadcrumb-item>背膘变化模拟</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-select
              v-model="pig_stationid"
              placeholder="请选择饲喂站"
              @change="getstationpig(pig_stationid)">
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
            <el-button type="primary" >查询</el-button>
          </el-col>
        </el-row>
      </div>
      <el-divider></el-divider>
      <div id="main" style="width: 95%;height:600px; margin-top: 30px"></div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import {
  getpoint,
  getstation
} from '../../../api/request'

export default {
  name: 'linefit',
  data () {
    return {
      station_options: [],
      pig_stationid: '',
      echarts_option: {
        title: {
          text: '背膘变化模拟',
          // subtext: 'By ecStat.regression',
          // sublink: 'https://github.com/ecomfe/echarts-stat',
          left: 'left'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        color: ['#F56C6C', '#409EFF', '#e618b2', '#67C23A'],
        legend: {
          data: ['scatter', 'Line'],
          selected: {
            Line: false
          }
        },
        toolbox: {
          show: true,
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            dataView: { readOnly: false },
            // magicType: { type: ['line', 'bar'] },
            restore: {},
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'value',
          name: '采食量/kg',
          axisLine: {
            symbol: ['none', 'arrow']
          },
          min: 0,
          splitLine: {
            lineStyle: {
              type: 'dashed'
            }
          }
        },
        yAxis: {
          type: 'value',
          name: '背膘厚/cm',
          axisLine: {
            symbol: ['none', 'arrow']
          },
          min: 0,
          splitLine: {
            lineStyle: {
              type: 'dashed'
            }
          }
        },
        series: [
          {
            name: 'scatter',
            type: 'scatter',
            emphasis: {
              label: {
                show: true,
                position: 'left',
                color: 'blue',
                fontSize: 16
              }
            },
            data: []
          },
          {
            name: 'Line',
            lineStyle: {
              color: '#409EFF',
              width: 3
            },
            type: 'line',
            // color: red,
            showSymbol: false,
            clip: true,
            data: ''
          }
        ]
      }
    }
  },
  methods: {
    /**
     * @return {number}
     */
    Line (x, coefficient) {
      return coefficient[0] * x + coefficient[1]
    },
    generateData (fitfunc, coefficient) {
      const data = []
      for (let i = 0; i <= 8; i += 0.1) {
        data.push([i, fitfunc(i, coefficient)])
      }
      return data
    },
    GetPicture () {
      getpoint().then(res => {
        console.log(res)
        this.echarts_option.series[0].data = res.data.pointdata
        const Param = res.data.coefficient
        this.echarts_option.series[1].data = this.generateData(this.Line, Param)
      })
    },
    draw () {
      // 基于准备好的dom，初始化echarts实例
      const myChart = echarts.init(document.getElementById('main'))
      // 指定图表的配置项和数据
      myChart.setOption(this.echarts_option)
    }
  },
  created () {
    this.GetPicture()
    getstation({ pageIndex: '空' }).then(res => {
      // console.log(res)
      this.station_options = res.data.station_options
    })
  },
  mounted () {
    this.draw()
  },
  watch: {
    // 观察option的变化
    echarts_option: {
      handler (newVal, oldVal) {
        if (this.myChart) {
          if (newVal) {
            this.myChart.setOption(newVal)
          } else {
            this.myChart.setOption(oldVal)
          }
        } else {
          this.draw()
        }
      },
      deep: true // 对象内部属性的监听，关键。
    }
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
