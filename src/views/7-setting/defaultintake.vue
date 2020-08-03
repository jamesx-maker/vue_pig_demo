<template>
  <div>
    <bread bigtitle="系统设置" smalltitle="默认饲喂量" icon="el-icon-setting"></bread>
    <div class="container">
      <el-row :gutter="20" class="row">
        <el-col :span="6">
          <div style="margin-top: 10px;margin-left: 10px" class="sel">
            <el-select v-model="value" placeholder="请选择品种">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="12">
          <div>
            <el-table
              class="settable1"
              :data="tableData"
              style="width: 100%">
              <el-table-column
                prop="key"
                label=""
                width="100"
                align="center">
              </el-table-column>
              <el-table-column
                prop="value1"
                label="50-100"
                width="100"
                align="center">
              </el-table-column>
              <el-table-column
                prop="value2"
                label="100-150"
                width="100"
                align="center">
              </el-table-column>
              <el-table-column
                prop="value3"
                label="150-200"
                width="100"
                align="center">
              </el-table-column>
              <el-table-column
                prop="value4"
                label="200-250"
                width="100"
                align="center">
              </el-table-column>
            </el-table>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="row">
        <el-col :span="12" :offset="6">
          <div>
            <el-table
              border
              class="settable2"
              ref="singleTable"
              :data="timeData"
              highlight-current-row
              @current-change="handleCurrentChange"
              style="width: 100%">
              <el-table-column
                align="center"
                prop="key"
                label=""
                width="120">
              </el-table-column>
              <el-table-column
                align="center"
                property="date"
                label="起始"
                width="120">
              </el-table-column>
              <el-table-column
                align="center"
                property="name"
                label="终止"
                width="120">
              </el-table-column>
              <el-table-column
                label="操作"
                align="center">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)">编辑
                </el-button>
              </el-table-column>
            </el-table>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import bread from '../../components/common/bread'

export default {
  name: 'defaultintake',
  components: {
    bread
  },
  data () {
    return {
      options: [{
        value: '选项1',
        label: '长白'
      }, {
        value: '选项2',
        label: '梅山'
      }, {
        value: '选项3',
        label: '大白'
      }, {
        value: '选项4',
        label: '杜洛克'
      }],
      value: '',
      tableData: [
        {
          key: '妊娠初期',
          value1: '1.0',
          value2: '1.2',
          value3: '1.4',
          value4: '1.6'
        },
        {
          key: '妊娠前期',
          value1: '1.0',
          value2: '1.2',
          value3: '1.4',
          value4: '1.6'
        },
        {
          key: '妊娠中期',
          value1: '1.0',
          value2: '1.2',
          value3: '1.4',
          value4: '1.6'
        },
        {
          key: '妊娠后期',
          value1: '1.0',
          value2: '1.2',
          value3: '1.4',
          value4: '1.6'
        }],
      timeData: [
        {
          key: '妊娠初期',
          date: '1',
          name: '3'
        },
        {
          key: '妊娠前期',
          date: '4',
          name: '30'
        },
        {
          key: '妊娠中期',
          date: '31',
          name: '89'
        },
        {
          key: '妊娠后期',
          date: '90',
          name: '107'
        }
      ],
      currentRow: null
    }
  },
  methods: {
    setCurrent (row) {
      this.$refs.singleTable.setCurrentRow(row)
    },
    handleCurrentChange (val) {
      this.currentRow = val
    }
  }
}
</script>

<style scoped>
  .setbox {
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    width: 700px;
    height: auto;
    margin: auto;
  }

  .settable1 {
    margin-top: 5px;
    max-width: 500px;
  }

  .settable2 {
    margin-top: 15px;
    max-width: 500px;
  }
</style>
