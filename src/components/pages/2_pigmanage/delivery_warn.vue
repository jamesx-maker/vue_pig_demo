<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-magic-stick"></i> 母猪管理
        </el-breadcrumb-item>
        <el-breadcrumb-item>分娩提醒</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
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
export default {
  name: 'delivery_warn',
  data () {
    return {
      stationpigs: []
    }
  }
}
</script>

<style scoped>

</style>
