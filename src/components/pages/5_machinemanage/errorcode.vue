<template>
  <div>
    <el-card>
      <el-table
        :data="errorData"
        stripe
        style="width: 100%">
        <el-table-column type="index"></el-table-column>
        <el-table-column
          prop="date"
          label="模块"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="故障码"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="说明">
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'ErrorCode',
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
