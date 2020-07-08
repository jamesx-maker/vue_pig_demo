<template>
    <div>
      <div class="crumbs">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>
            <i class="el-icon-magic-stick"></i> 母猪管理
          </el-breadcrumb-item>
          <el-breadcrumb-item>离栏</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="container">
        <el-row :gutter="20" class="row">
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
        </el-row>
        <el-table :data="stationpigs" border>
          <el-table-column label="品种" prop="pigkind" align="center"></el-table-column>
          <el-table-column label="身份码" prop="pigid" align="center"></el-table-column>
          <el-table-column label="耳标号" prop="earid" align="center"></el-table-column>
          <el-table-column label="操作离栏">
            <template slot-scope="scope">
              <el-button size="mini" type="danger" @click="decpigs(scope.row.stationid,scope.row.pigid)">出栏</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
</template>

<script>
export default {
  name: 'subtraction_pig',
  data () {
    return {
      options: [],
      // stationid: '',
      stationpigs: [],
      addpig: {
        pig_stationid_id: '',
        pigid: '',
        earid: '',
        pigkind: ''
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
/*.row{*/
/*  margin-bottom: 20px;*/
/*}*/
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
