<template>
  <div>
    <bread bigtitle="母猪管理" smalltitle="生产信息" icon="el-icon-magic-stick"></bread>
    <div class="container">
      <div class="farrowitem">
        <div class="leftitem">
          <div class="1"
               style="width: 300px;height: 100px;">
            <el-select
              v-model="pig_earid"
              style="margin-left: 20px;"
              clearable
              placeholder="请选择耳标号">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div style="width: 300px;height: 100px;margin-left: 20px;">疫病：无</div>
          <div style="width: 300px;height: 100px;margin-left: 20px;">体况：良好</div>
          <div style="width: 300px;height: 100px;margin-left: 20px;">配种周：40</div>
          <div style="width: 300px;height: 100px;margin-left: 20px;">
            <el-button type="primary">录入生产信息</el-button>
          </div>
        </div>
        <div class="rightitem">
          <table class="myTable" style="width:100%">
            <tr v-for="(item,index) in statDatas" v-bind:key="index">
              <td class="column">{{item.key}}</td>
              <td class="column">{{item.value}}</td>
              <td class="column">{{item.key1}}</td>
              <td class="column">{{item.value1}}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import bread from '../../common/bread'

export default {
  name: 'farrow',
  components: {
    bread
  },
  data () {
    return {
      options: [],
      pig_earid: '',
      statDatas: [
        {
          key: '胎次',
          value: '1',
          key1: '2',
          value1: '平均胎'
        },
        {
          key: '分娩日期',
          value: '2015-1-15',
          key1: '2015-2-3',
          value1: '-'
        },
        {
          key: '断奶日期',
          value: '2015-5-20',
          key1: '2016-3-12',
          value1: '-'
        },
        {
          key: '第一次配种',
          value: '2015-2-20',
          key1: '2016-4-18',
          value1: '-'
        },
        {
          key: '最后一次配种',
          value: '2015-2-28',
          key1: '2016-4-1',
          value1: '-'
        },
        {
          key: '配种次数',
          value: '3',
          key1: '2',
          value1: '2.5'
        },
        {
          key: '怀孕次数',
          value: '121',
          key1: '115',
          value1: '118'
        },
        {
          key: '产仔量',
          value: '7',
          key1: '7',
          value1: '7'
        },
        {
          key: '死胎数',
          value: '0',
          key1: '0',
          value1: '0'
        },
        {
          key: '断奶数量',
          value: '7',
          key1: '7',
          value1: '7'
        },
        {
          key: '断奶前死亡',
          value: '0',
          key1: '0',
          value1: '0'
        },
        {
          key: '成活率',
          value: '100%',
          key1: '100%',
          value1: '100%'
        }
      ]
    }
  }
}
</script>

<style scoped>
  .farrowitem {
    display: flex;
    flex-wrap: wrap;
    width: 1050px;
    margin: auto;
  }

  .leftitem {
    width: 400px;
    height: 500px;
    /*background-color: #409EFF;*/
  }

  .rightitem {
    margin-left: 40px;
    width: 600px;
    /*background-color: #67C23A;*/
  }

  .myTable {
    border-collapse: collapse;
    margin: 0 auto;
    text-align: center;
  }

  .myTable td,
  .myTable th {
    border: 1px solid #cad9ea;
    color: #666;
    height: 45px;
  }
</style>
