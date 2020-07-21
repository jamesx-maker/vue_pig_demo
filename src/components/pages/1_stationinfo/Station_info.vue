<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-house"></i> 饲喂站信息
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
        <div class="handle-box">
          <el-row :gutter="20">
            <el-col :span="6">
              <el-input v-model.number="query.room"
                        placeholder="请输入单元号"
                        maxlength="2"
                        show-word-limit
                        class="handle-input mr10">
              </el-input>
            </el-col>
            <el-col :span="6">
              <el-input
                v-model.number="query.station_id"
                placeholder="饲喂站号"
                maxlength="4"
                show-word-limit
                class="handle-input mr10"
              ></el-input>
            </el-col>
            <el-col :span="6">
              <el-button
          type="primary"
          icon="el-icon-check"
          @click="handleAddition"
        >添加</el-button>
            </el-col>
          </el-row>
      </div>
      <el-divider></el-divider>
      <el-table
        :data="tableData"
        border
        class="table"
        ref="multipleTable"
        header-cell-class-name="table-header"
      >
<!--        <el-table-column type="selection" width="55" align="center"></el-table-column>-->
        <el-table-column prop="id" label="饲喂站号" align="center"></el-table-column>
        <el-table-column prop="temperature" label="温度/℃" align="center"></el-table-column>
        <el-table-column prop="humidity" label="湿度" align="center"></el-table-column>
        <el-table-column label="状态" align="center">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.status==='运行中'?'success':(scope.row.status==='已关机'?'danger':'')"
            >{{scope.row.status}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              icon="el-icon-edit"
              @click="handleEdit(scope.$index, scope.row)"
            >开关机
            </el-button>
            <el-button
              type="text"
              icon="el-icon-delete"
              class="red"
              @click="handleDelete(scope.$index)"
            >删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          layout="total, prev, pager, next"
          :current-page="page.pageIndex"
          :page-size='page.pageSize'
          :total="page.total"
          @current-change="handlePageChange"
        ></el-pagination>
      </div>
    </div>
    <!-- 编辑弹出框 -->
    <el-dialog title="开关机" :visible.sync="editVisible" width="30%">
      <div align="center">
        <el-button
          icon="el-icon-check"
          type="success"
        >开机
        </el-button>
        <el-button
          icon="el-icon-close"
          type="danger"
        >关机
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { addstation, getstation } from '../../../api/request'

export default {
  name: 'Station_info',
  data () {
    return {
      query: {
        room: '',
        station_id: ''
      },
      page: {
        pageIndex: 1,
        pageSize: 10,
        total: 0
      },
      tableData: [
        // {
        //   id: '01 - 0123',
        //   temperature: 25,
        //   humidity: 0.45,
        //   status: '运行中'
        // }
      ],
      editVisible: false,
      pageTotal: 0,
      form: {},
      idx: -1,
      id: -1
    }
  },
  async created () {
    const res = await getstation(this.page)
    this.tableData = res.data.all_station
    // console.log(res.data.total)
    this.page.total = res.data.total
  },
  methods: {
    // 高位补0函数
    formatZero (num, len) {
      if (String(num).length > len) {
        return num
      }
      return (Array(len).join(0) + num).slice(-len)
    },
    // 触发添加按钮
    handleAddition () {
      if (typeof (this.query.room) === 'number' && typeof (this.query.station_id) === 'number') {
        const room = this.formatZero(this.query.room, 2)
        const stationId = this.formatZero(this.query.station_id, 4)
        const sendpar = room + '-' + stationId
        addstation(sendpar).then(res => {
          if (res.status === 200) {
            this.$message.success(res.data.code)
            // console.log(res)
            getstation(this.page).then(res => {
              // console.log(res)
              this.tableData = res.data.all_station
              console.log(res.data.total)
              this.page.total = res.data.total
            })
          } else {
            this.$message.error(res.data.code)
          }
        })
        // getstation(this.query).then(res => {
        //   console.log(res)
        // })
      } else {
        this.$message.error('格式错误，请重新输入')
      }
    },
    // 删除操作
    handleDelete (index) {
      // 二次确认删除
      this.$confirm('确定要删除吗？', '提示', {
        type: 'warning'
      })
        .then(() => {
          this.$message.success('删除成功')
          this.tableData.splice(index, 1)
        })
        .catch(() => {
        })
    },
    // 编辑操作
    handleEdit (index, row) {
      this.idx = index
      this.form = row
      this.editVisible = true
    },
    getData () {},
    // 分页导航
    handlePageChange (val) {
      console.log(this.query.pageIndex)
      this.$set(this.query, 'pageIndex', val)
    }
  }
}
</script>

<style scoped>
  .handle-box {
    margin-bottom: 20px;
  }

  .handle-select {
    width: 120px;
  }

  .handle-input {
    width: 200px;
    display: inline-block;
  }

  .table {
    width: 100%;
    font-size: 14px;
  }

  .red {
    color: #ff0000;
  }

  .mr10 {
    margin-right: 10px;
  }

  .table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
  }
</style>
