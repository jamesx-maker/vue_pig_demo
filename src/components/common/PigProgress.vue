<template>
  <div>
    <span>长白</span>
    <el-progress :text-inside="true" :stroke-width="25" :percentage="70"></el-progress>
    <span>大白</span>
    <el-progress :text-inside="true" :stroke-width="25" :percentage="100" status="success"></el-progress>
    <span>梅山</span>
    <el-progress :text-inside="true" :stroke-width="25" :percentage="80" status="warning"></el-progress>
    <span>杜洛克</span>
    <el-progress :text-inside="true" :stroke-width="25" :percentage="50" status="exception"></el-progress>
  </div>
</template>

<script>
export default {
  name: 'PigProgress'
}
</script>

<style scoped>

</style>
