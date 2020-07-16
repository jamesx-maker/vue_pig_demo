<template>
  <div>
    <bread bigtitle="母猪管理" smalltitle="分娩提醒" icon="el-icon-magic-stick"></bread>
    <div class="container">
      <el-table :data="stationpigs" border>
        <el-table-column label="饲喂站" prop="stationid"></el-table-column>
        <el-table-column label="身份码" prop="pigid"></el-table-column>
        <el-table-column label="耳标号" prop="earid"></el-table-column>
        <el-table-column label="品种" prop="pigkind"></el-table-column>
        <el-table-column label="预产日期" prop="delivery_data"></el-table-column>
        <el-table-column label="上产床提醒天数" prop="days"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import bread from '../../common/bread'

export default {
  name: 'delivery_warn',
  components: {
    bread
  },
  data () {
    return {
      stationpigs: []
    }
  }
}
</script>

<style scoped>

</style>
