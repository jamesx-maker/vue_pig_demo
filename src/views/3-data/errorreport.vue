<template>
  <div>
    <bread bigtitle="数据查询" smalltitle="异常信息报告" icon="el-icon-s-data"></bread>
    <div class="container">
      <div>
        <h1>异常信息报告</h1>
        <div>
          <a href="www.baidu.com" style="text-decoration:underline;">预警报告</a>
        </div>
        <div>
          <a href="www.baidu.com" style="text-decoration:underline;">模块异常报告</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import bread from '../../components/common/bread'

export default {
  name: 'errorreport',
  components: {
    bread
  }
}
</script>

<style scoped>

</style>
