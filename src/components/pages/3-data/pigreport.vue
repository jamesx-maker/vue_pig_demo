<template>
  <div>
    <bread bigtitle="数据查询" smalltitle="母猪饲喂报告" icon="el-icon-s-data"></bread>
    <div class="container">
      <div>
        <h1>母猪饲喂报告</h1>
        <div>
          <a href="www.baidu.com" style="text-decoration:underline;">母猪生长日报告</a>
        </div>
        <div>
          <a href="www.baidu.com" style="text-decoration:underline;">母猪生长总报告</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import bread from '../../common/bread'
export default {
  name: 'pigreport',
  components: {
    bread
  }
}
</script>

<style scoped>

</style>
