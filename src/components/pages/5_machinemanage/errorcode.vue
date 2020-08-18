<template>
  <div>
    <bread bigtitle="设备管理" smalltitle="故障码" icon="el-icon-s-opportunity"></bread>
    <div class="container">
      <el-table
        :data="errorData"
        stripe
        style="width: 100%">
        <el-table-column type="index" width="100px" align="center"></el-table-column>
        <el-table-column
          prop="date"
          label="模块"
          align="center">
        </el-table-column>
        <el-table-column
          prop="name"
          label="故障码"
          align="center">
        </el-table-column>
        <el-table-column
          prop="address"
          label="说明"
          align="center">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import bread from '../../common/bread'
export default {
  name: 'ErrorCode',
  components: {
    bread
  },
  data () {
    return {
      errorData: [{
        date: 'CAN',
        name: '101',
        address: ''
      }, {
        date: '温度',
        name: '102',
        address: ''
      }, {
        date: '湿度',
        name: '103',
        address: ''
      }, {
        date: '电机',
        name: '104',
        address: ''
      }, {
        date: 'CAN',
        name: '101',
        address: ''
      }, {
        date: '温度',
        name: '102',
        address: ''
      }, {
        date: '湿度',
        name: '103',
        address: ''
      }, {
        date: '电机',
        name: '104',
        address: ''
      }]
    }
  }
}
</script>

<style scoped>

</style>
