<template>
  <div>
    <bread bigtitle="母猪管理" smalltitle="分娩信息录入" icon="el-icon-s-data"></bread>
    <div class="container">
      <div class="farrowitem">
        <div class="leftitem">
          <div class="1"
               style="width: 300px;height: 100px;">
            <el-input
              placeholder="请输入耳标号"
              v-model.number="earid"
              maxlength="8"
              show-word-limit
            >
            </el-input>
          </div>
          <div style="width: 300px;height: 100px;margin-left: 20px;">疫病：无</div>
          <div style="width: 300px;height: 100px;margin-left: 20px;">体况：良好</div>
          <div style="width: 300px;height: 100px;margin-left: 20px;">配种周：40</div>
          <div style="width: 300px;height: 100px;margin-left: 20px;">
            <el-button type="primary" @click="add_farrow">录入生产信息</el-button>
          </div>
        </div>
        <div class="rightitem">
          <table class="myTable" style="width:100%">
            <tr v-for="(item,index) in statDatas" v-bind:key="index">
              <td class="column">{{item.key}}</td>
              <td class="column">{{item.value}}</td>
              <td class="column">{{item.key1}}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
    <el-dialog title="录入生产信息" :visible.sync="dialogFormVisible" width="500px">
      <el-form :model="form">
        <el-form-item label="总产仔数 ">
          <el-input v-model="form.total" type="number"></el-input>
        </el-form-item>
        <el-form-item label="产活仔数 ">
          <el-input v-model="form.live" type="number"></el-input>
        </el-form-item>
        <el-form-item label="仔猪个体重">
          <el-input v-model="form.heavy"></el-input>
        </el-form-item>
        <el-form-item label="窝重   ">
          <el-input v-model="form.totalheavy"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import bread from '../../common/bread'

export default {
  name: 'farrow',
  components: {
    bread
  },
  data () {
    return {
      earid: '',
      options: [],
      dialogFormVisible: false,
      form: [],
      pig_earid: '',
      statDatas: [
        {
          key: '分娩日期',
          value: '2020-7-15',
          key1: '2019-7-15'
        },
        {
          key: '总产仔数',
          value: '7',
          key1: '8'
        },
        {
          key: '产活仔数',
          value: '7',
          key1: '7'
        },
        {
          key: '仔猪个体重',
          value: '3,5,7',
          key1: '6,6,7'
        },
        {
          key: '窝重',
          value: '3,5,7',
          key1: '6,6,7'
        }
      ]
    }
  },
  methods: {
    add_farrow () {
      this.dialogFormVisible = true
    },
    close () {
      this.dialogFormVisible = false
      this.$message({
        type: 'info',
        message: '已取消录入'
      })
    },
    add () {
      this.dialogFormVisible = false
      this.$message({
        type: 'success',
        message: '录入成功'
      })
    }
  }
}
</script>

<style scoped>
  .farrowitem {
    display: flex;
    flex-wrap: wrap;
    width: 1050px;
    margin: auto;
  }

  .leftitem {
    width: 400px;
    height: 500px;
    /*background-color: #409EFF;*/
  }

  .rightitem {
    margin-left: 40px;
    width: 600px;
    /*background-color: #67C23A;*/
  }

  .myTable {
    border-collapse: collapse;
    margin: 0 auto;
    text-align: center;
  }

  .myTable td,
  .myTable th {
    border: 1px solid #cad9ea;
    color: #666;
    height: 45px;
  }
  .el-input {
    width: 210px;
  }
</style>
