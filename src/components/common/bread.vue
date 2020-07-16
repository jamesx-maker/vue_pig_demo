<template>
  <div class="crumbs">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>
<!--        el-icon-magic-stick-->
        <i :class="icon"></i>{{bigtitle}}
      </el-breadcrumb-item>
      <el-breadcrumb-item>{{smalltitle}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  props: {
    bigtitle: String,
    smalltitle: String,
    icon: String
  },
  name: 'bread'
}
</script>

<style scoped>

</style>
