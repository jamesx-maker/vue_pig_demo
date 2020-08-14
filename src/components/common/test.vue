<template>
  <div id="test">
    测试用
  </div>
</template>

<script>
export default {
  el: '#test',
  name: 'test',
  data () {
    return {
      data: 'aaaaa',
      info: 'nono'
    }
  },
  methods: {
  },
  beforeCreate () {
    console.log('创建前========')
    console.log(this.data)
    console.log(this.$el)
  },
  created () {
    console.log('已创建========')
    console.log(this.info)
    console.log(this.$el)
  },
  beforeMount () {
    console.log('mount之前========')
    console.log(this.info)
    console.log(this.$el)
  },
  mounted () {
    console.log('mounted========')
    console.log(this.info)
    console.log(this.$el)
  },
  beforeUpdate () {
    console.log('更新前========')
  },
  updated () {
    console.log('更新完成========')
  },
  beforeDestroy () {
    console.log('销毁前========')
    console.log(this.info)
    console.log(this.$el)
  },
  destroyed () {
    console.log('已销毁========')
    console.log(this.info)
    console.log(this.$el)
  }
}
</script>

<style scoped>
  .el-table{
    margin-top: 10px;
  }
  .el-col{
    margin-top: 10px;
  }
  .el-select{
    width: auto;
    max-width: 210px;
  }
  .el-input{
    width: 210px;
  }
</style>
