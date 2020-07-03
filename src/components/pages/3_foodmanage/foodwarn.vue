<template>
    <div>
      <el-table :data="stationfood" border>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="饲喂站" prop="stationid"></el-table-column>
        <el-table-column label="当前剩余饲料" prop="pigid"></el-table-column>
        <el-table-column label="操作" prop="set"></el-table-column>
        <!--        <el-table-column label="操作">-->
        <!--          <template slot-scope="scope">-->
        <!--            <el-button size="mini" type="danger" @click="decpigs(scope.row.stationid,scope.row.pigid)">出栏</el-button>-->
        <!--          </template>-->
        <!--        </el-table-column>-->
      </el-table>
    </div>
</template>

<script>
export default {
  name: 'foodwarn',
  data () {
    return {
      stationfood: []
    }
  }
}
</script>

<style scoped>

</style>
