<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-select v-model="addpig.pig_stationid_id"
                   clearable
                   placeholder="请选择饲喂站"
                   @change="getstationpig(addpig.pig_stationid_id)"
                   size="250px">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="6">
        <template>
          <div class="block">
            <span class="demonstration"></span>
            <el-date-picker
              class="date-picker"
              value-format="yyyy-MM-dd"
              v-model="addpig.breedtime"
              type="date"
              placeholder="请选择日期">
            </el-date-picker>
          </div>
        </template>
      </el-col>
      <el-col :span="6">
        <el-input placeholder="请输入饲料名称" v-model="addpig.earid">
        </el-input>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-input placeholder="请输入饲料数量" v-model="addpig.backfat">
        </el-input>
      </el-col>
      <el-col :span="6">
        <el-input placeholder="请输入饲料规格" v-model="addpig.gesage">
        </el-input>
      </el-col>
      <el-col :span="6" style="margin-left: 250px">
        <el-button type="primary" @click="addpigs">确定</el-button>
      </el-col>
    </el-row>
    <el-table :data="stationpigs" border>
      <el-table-column type="index"></el-table-column>
      <el-table-column label="日期" prop="stationid"></el-table-column>
      <el-table-column label="饲喂站号" prop="pigid"></el-table-column>
      <el-table-column label="饲料名称" prop="earid"></el-table-column>
      <el-table-column label="加入饲料量" prop="malepignum"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'infood',
  data () {
    return {
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() > Date.now()
        }
      },
      options: [],
      // stationid: '',
      stationpigs: [],
      addpig: {
        pig_stationid_id: '',
        pigid: '',
        earid: '',
        kind: '',
        malepignum: '',
        backfat: '',
        gesage: '',
        vaccine: '',
        breedtime: ''
      }
    }
  },
  created () {
    // this.getstationid()
  },
  methods: {
    getstationid () {
      this.$http.get('getstationid/').then((res) => {
        // console.log
        this.options.splice(0)
        for (let i = 0; i < res.data.id.length; i++) {
          this.options.push({
            value: res.data.id[i],
            label: res.data.id[i]
          })
        }
      })
    },
    getstationpig (A) {
      this.$http.post('getstationpig/', A).then((res) => {
        this.stationpigs.splice(0)
        // console.log(res)
        const result = JSON.parse(res.data.pigs)
        // console.log(result)
        for (const i in result) {
          this.stationpigs.push(result[i].fields)
        }
        // console.log(this.stationpigs)
      })
    },
    addpigs () {
      this.$http.post('addpigs/', this.addpig).then((res) => {
        if (res.data.code !== 'ok') return this.$message.error(res.data.message)
        this.$message.success(res.data.message)
        // console.log(res)
        this.getstationpig(this.addpig.pig_stationid_id)
        this.addpig.malepignum = ''
        this.addpig.pigid = ''
        this.addpig.backfat = ''
        this.addpig.gesage = ''
        this.addpig.vaccine = ''
        this.addpig.earid = ''
        this.addpig.kind = ''
        this.addpig.breedtime = ''
      })
    },
    decpigs (A, B) {
      this.$http.post('decpigs/', [A, B]).then((res) => {
        if (res.data.code !== 'ok') return this.$message.error(res.data.message)
        this.$message.success(res.data.message)
        console.log(res)
        this.getstationpig(this.addpig.pig_stationid_id)
      })
    }
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
    max-width: 202px;
  }
  .date-picker{
    max-width: 202px !important;
    width: auto;
  }
  .el-input{
    width: auto;
  }
</style>
