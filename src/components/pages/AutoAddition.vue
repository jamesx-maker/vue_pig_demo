<template>
  <div>
    <div class="upload" style="height: 250px">
      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="6">
          <el-upload
            ref="upload"
            class="upload-demo"
            action=" http://127.0.0.1:8000/uploadpig/"
            style="margin: auto"
            accept=".xlsx"
            :limit="1"
            :on-success="uploadsuccess"
            :on-error="uploadfail"
            :on-exceed="exceed">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text"><em>点击上传</em>母猪入栏表格</div>
            <div class="el-upload__tip" slot="tip">tips：只能上传excel表格</div>
          </el-upload>
        </el-col>
      </el-row>
    </div>
    <el-table :data="auto_addition_pigs">
      <el-table-column label="饲喂站号"
                       prop="stationid"
                       align="center"
                       :filters="[{text: '01-01-0001', value: '01-01-0001'},
                       {text: '01-01-0002', value: '01-01-0002'},
                       {text: '01-01-0003', value: '01-01-0003'},
                       {text: '01-01-0004', value: '01-01-0004'}]"
                       :filter-method="filterHandler"
                       width="120px"></el-table-column>
      <el-table-column label="母猪号" prop="pigid" align="center" width="160px"></el-table-column>
      <el-table-column label="电子耳标号" prop="earid" align="center" width="160px"></el-table-column>
      <el-table-column label="母猪品种" prop="pigkind" align="center"></el-table-column>
      <el-table-column label="与配公猪号" prop="malepignum" align="center" width="160px"></el-table-column>
      <el-table-column label="公猪品种" prop="" align="center" width="100px"></el-table-column>
      <el-table-column label="配种时间" prop="breedtime" align="center" width="95px"></el-table-column>
      <el-table-column label="背膘厚/mm" prop="backfat" align="center" width="120px"></el-table-column>
      <el-table-column label="胎龄" prop="gesage" align="center" width="120px"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="change(scope.row)">修订</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'auto_addition',
  data () {
    return {
      auto_addition_pigs: []
    }
  },
  methods: {
    change () {
      console.log('修改')
    },
    filterHandler (value, row, column) {
      const property = column.property
      console.log(value)
      // console.log(row)
      // console.log(column.property)
      return row[property] === value
    },
    uploadsuccess (res) {
      this.$message({
        message: '上传文件成功',
        type: 'success'
      })
      console.log(res)
    },
    uploadfail () {
      this.$message({
        message: '上传文件失败，请重试',
        type: 'error'
      })
    },
    exceed () {
      this.$message({
        message: '每次只能上传一个表格',
        type: 'warning'
      })
    }
  }
}
</script>

<style scoped>
</style>
