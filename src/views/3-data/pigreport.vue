<template>
  <div>
    <bread bigtitle="数据查询" smalltitle="母猪饲喂报告" icon="el-icon-s-data"></bread>
    <div class="container">
      <div>
        <h1>母猪报告</h1>
        <div>
          <a href="www.baidu.com" style="text-decoration:underline;">母猪出入栏报告</a>
        </div>
        <div>
          <a href="www.baidu.com" style="text-decoration:underline;">妊娠期母猪个体管理报告</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import bread from '../../components/common/bread'
export default {
  name: 'pigreport',
  components: {
    bread
  }
}
</script>

<style scoped>

</style>
