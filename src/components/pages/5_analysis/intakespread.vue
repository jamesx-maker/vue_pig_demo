<template>
  <div id="main" style="width: 1050px;height:550px;"></div>
</template>

<script>
import echarts from 'echarts'
export default {
  name: 'intakespread',
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
      }
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

</style>
