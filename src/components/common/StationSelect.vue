<template>
  <div>
    <el-select v-model="StationId"
               clearable
               placeholder="请选择饲喂站"
               @change="getstationpig(StationId)"
               size="250px"
               filterable>
      <el-option
        v-for="item in StationList"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
  </div>
</template>

<script>

export default {
  name: 'StationSelect',
  data () {
    return {
      StationList: [],
      StationId: ''
    }
  },
  created () {
    this.StationList = this.$store.state.StationIist
    // console.log(this.StationList)
  },
  methods: {
    getstationpig (StationId) {
      this.$emit('StationChange', StationId, this.StationList)
    }
  }
}
</script>

<style scoped>
  .el-select {
    width: 210px;
  }
</style>
