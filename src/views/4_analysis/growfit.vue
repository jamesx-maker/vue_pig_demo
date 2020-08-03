<template>
  <div>
    <div class="container">
      <div id="main" style="width: 1050px;height:550px;"></div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import { getpoint, getcoefficient } from '../../api/request'

export default {
  name: 'growfit',
  data () {
    return {
      echarts_option: {
        title: {
          text: '生长拟合分析',
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
          data: ['scatter', 'Saturation', 'Logistic', 'Gompertz'],
          selected: {
            Saturation: false,
            Logistic: false,
            Gompertz: false
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
          axisLine: {
            symbol: ['none', 'arrow']
          },
          min: 40,
          splitLine: {
            lineStyle: {
              type: 'dashed'
            }
          }
        },
        yAxis: {
          type: 'value',
          axisLine: {
            symbol: ['none', 'arrow']
          },
          min: 2.5,
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
            name: 'Saturation',
            lineStyle: {
              color: '#409EFF',
              width: 3
            },
            type: 'line',
            // color: red,
            showSymbol: false,
            clip: true,
            data: ''
          },
          {
            name: 'Logistic',
            lineStyle: {
              color: '#e618b2',
              width: 3
            },
            type: 'line',
            // color: red,
            showSymbol: false,
            clip: true,
            data: ''
          },
          {
            name: 'Gompertz',
            lineStyle: {
              color: '#67C23A',
              width: 3
            },
            type: 'line',
            // color: red,
            showSymbol: false,
            clip: true, // 是否裁剪超出坐标系部分的图形，具体裁剪效果根据系列决定
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
    SaturationFit (x, coefficient) {
      return x / (coefficient[0] + coefficient[1] * x)
    },
    /**
     * @return {number}
     */
    LogisticFit (x, coefficient) {
      return coefficient[0] / (1 + coefficient[1] * Math.pow(Math.E, -coefficient[2] * x))
    },
    /**
     * @return {number}
     */
    GompertzFit (x, coefficient) {
      return coefficient[0] * Math.pow(Math.E, -coefficient[1] * Math.pow(Math.E, -coefficient[2] * x))
    },
    generateData (fitfunc, coefficient) {
      const data = []
      for (let i = 40; i <= 120; i += 0.1) {
        data.push([i, fitfunc(i, coefficient)])
      }
      return data
    },
    GetPoint () {
      getpoint().then(res => {
        // console.log(res.data)
        this.echarts_option.series[0].data = res.data.code
      }).catch(err => {
        console.log(err)
      })
    },
    GetParam () {
      getcoefficient().then(res => {
        // console.log(res.data.code)
        const SParam = res.data.code.SCoefficient.popt
        const LParam = res.data.code.LCoefficient.popt
        const GParam = res.data.code.GCoefficient.popt
        this.echarts_option.series[1].data = this.generateData(this.SaturationFit, SParam)
        this.echarts_option.series[2].data = this.generateData(this.LogisticFit, LParam)
        this.echarts_option.series[3].data = this.generateData(this.GompertzFit, GParam)
      }).catch(err => {
        console.log(err)
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
    this.GetPoint()
    this.GetParam()
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

</style>
