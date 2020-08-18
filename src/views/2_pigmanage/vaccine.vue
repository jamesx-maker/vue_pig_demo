<template>
  <div>
    <bread bigtitle="母猪管理" smalltitle="免疫计划" icon="el-icon-magic-stick"></bread>
    <div class="container">
      <div style="width:100%;margin: auto;">
        <el-button
          plain
          size="medium"
          @click="open1">
          查看免疫计划
        </el-button>
      </div>
      <el-table :data="existpigs" border>
        <el-table-column label="身份码" prop="pigid" width="160px" align="center"></el-table-column>
        <el-table-column label="耳标号" prop="earid" align="center"></el-table-column>
        <el-table-column label="品种" prop="pigkind" align="center"></el-table-column>
        <el-table-column label="妊娠天数" prop="breeddays" align="center"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import bread from '../../components/common/bread'
export default {
  name: 'vaccine',
  components: {
    bread
  },
  data () {
    return {
      existpigs: []
    }
  },
  methods: {
    open1 () {
      // const h = this.$createElement
      this.$notify({
        title: '免疫计划',
        type: 'info',
        dangerouslyUseHTMLString: true,
        message: `<div style="font-size: 18px;color: teal;">
                    <i>
                      <p>妊娠第10天,需注射A疫苗</p>
                      <p>妊娠第20天,需注射B疫苗</p>
                      <p>妊娠第30天,需注射C疫苗</p>
                      <p>妊娠第40天,需注射D疫苗</p>
                      <p>妊娠第50天,需注射E疫苗</p>
                      <p>妊娠第60天,需注射F疫苗</p>
                      <p>妊娠第70天,需注射G疫苗</p>
                      <p>妊娠第80天,需注射H疫苗</p>
                      <p>妊娠第90天,需注射I疫苗</p>
                    </i>
                  </div>`,
        duration: 0
      })
    }
  }
}
</script>

<style scoped>
.el-notification {
  white-space:pre !important;
}
.el-table{
  margin-top: 10px;
}
.el-col{
  margin-top: 10px;
}
.el-select{
  width: auto;
  max-width: 202px;
}
.input1{
  width: 250px;
  margin-left: 55px;
}
.input2{
  width: 120px;
}
</style>
