<template>
  <div>
    <bread bigtitle="母猪管理" smalltitle="入栏" icon="el-icon-magic-stick"></bread>
    <div class="container">
      <el-tabs v-model="activeName" @tab-click="handletabs">
        <el-tab-pane label="手动入栏" name="hand">
          <HandAddition></HandAddition>
        </el-tab-pane>
        <el-tab-pane label="一键入栏" name="auto">
          <AutoAddition></AutoAddition>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import bread from '../../components/common/bread'
import HandAddition from '../../components/pages/HandAddition'
import AutoAddition from '../../components/pages/AutoAddition'

export default {
  name: 'addition_pig',
  data () {
    return {
      activeName: 'hand'
    }
  },
  components: {
    bread,
    HandAddition,
    AutoAddition
  },
  methods: {
    handletabs (tab, event) {
      console.log(tab, event)
    }
    // async GetPigs (StationId) {
    //   const res = await getStationPig({ StationId: StationId })
    //   this.existpigs = res.data.stationpig
    // },
    // change () {
    //   console.log('修改')
    // },
    // filterHandler (value, row, column) {
    //   const property = column.property
    //   console.log(value)
    //   // console.log(row)
    //   // console.log(column.property)
    //   return row[property] === value
    // }
  }
}
</script>

<style scoped>
  .el-table {
    margin-top: 10px;
  }

  .el-col {
    margin-top: 10px;
  }

  .el-select {
    width: 210px;
  }

  .date-picker {
    width: 210px;
  }

  .el-input {
    width: 210px;
  }
</style>
