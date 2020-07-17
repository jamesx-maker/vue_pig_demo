<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-monitor"></i> 系统首页
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card shadow="hover" class="mgb20" style="height:252px;">
          <div class="user-info">
            <img src="../../assets/img/HZAU.jpg" class="user-avator" alt/>
            <div class="user-info-cont">
              <div class="user-info-name">{{name}}</div>
              <div>{{role}}</div>
            </div>
          </div>
          <div class="user-info-list">
            上次登录时间：
            <span>2020-07-17</span>
          </div>
          <div class="user-info-list">
            上次登录地点：
            <span>武汉</span>
          </div>
        </el-card>
        <el-card shadow="hover" style="height:252px;">
          <div slot="header" class="clearfix">
            <span>品种详情</span>
          </div>
          长白
          <el-progress :percentage="71.3" color="#42b983"></el-progress>
          大白
          <el-progress :percentage="24.1" color="#f1e05a"></el-progress>
          梅山
          <el-progress :percentage="13.7"></el-progress>
          杜洛克
          <el-progress :percentage="5.9" color="#f56c6c"></el-progress>
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-row :gutter="20" class="mgb20">
          <el-col :span="8">
            <el-card shadow="hover" :body-style="{padding: '0px'}">
              <div class="grid-content grid-con-1">
                <i class="el-icon-place grid-con-icon"></i>
                <div class="grid-cont-right">
                  <div class="grid-num">HZAU</div>
                  <div>猪场代码</div>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card shadow="hover" :body-style="{padding: '0px'}">
              <div class="grid-content grid-con-2">
                <i class="el-icon-house grid-con-icon"></i>
                <div class="grid-cont-right">
                  <div class="grid-num">{{station_num}}</div>
                  <div>饲喂站数量</div>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card shadow="hover" :body-style="{padding: '0px'}">
              <div class="grid-content grid-con-3">
                <i class="el-icon-s-custom grid-con-icon"></i>
                <div class="grid-cont-right">
                  <div class="grid-num">{{pig_num}}</div>
                  <div>母猪数量</div>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <el-card shadow="hover" style="height:403px;">
          <div slot="header" class="clearfix">
            <span>待办事项</span>
            <el-button style="float: right; padding: 3px 0" type="text">添加</el-button>
          </div>
          <el-table :show-header="false" :data="todoList" style="width:100%;">
            <el-table-column width="40">
              <template slot-scope="scope">
                <el-checkbox v-model="scope.row.status"></el-checkbox>
              </template>
            </el-table-column>
            <el-table-column>
              <template slot-scope="scope">
                <div
                  class="todo-item"
                  :class="{'todo-item-del': scope.row.status}"
                >{{scope.row.title}}
                </div>
              </template>
            </el-table-column>
            <el-table-column width="60">
              <template>
                <i class="el-icon-edit"></i>
                <i class="el-icon-delete"></i>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
<!--    <el-row :gutter="20">-->
<!--      <el-col :span="12">-->
<!--        <el-card shadow="hover">-->
<!--          <schart ref="bar" class="schart" canvasId="bar" :options="options"></schart>-->
<!--        </el-card>-->
<!--      </el-col>-->
<!--      <el-col :span="12">-->
<!--        <el-card shadow="hover">-->
<!--          <schart ref="line" class="schart" canvasId="line" :options="options2"></schart>-->
<!--        </el-card>-->
<!--      </el-col>-->
<!--    </el-row>-->
  </div>
</template>

<script>
// import bus from '../common/bus'
import { getsystem } from '../../api/request'

export default {
  name: 'system_index',
  data () {
    return {
      name: localStorage.getItem('ms_username'),
      todoList: [
        {
          title: '耳标损坏',
          status: false
        },
        {
          title: '下周三要添加饲料',
          status: false
        },
        {
          title: '下周五有母猪产仔',
          status: false
        },
        {
          title: '下周四要清理',
          status: false
        },
        {
          title: '下周二要添加饲料',
          status: true
        },
        {
          title: '下周三要打疫苗',
          status: true
        }
      ],
      station_num: 0,
      pig_num: 0
    }
  },
  computed: {
    role () {
      return this.name === 'admin' ? '超级管理员' : '普通用户'
    }
  },
  created () {
    getsystem().then(res => {
      console.log(res)
      this.station_num = res.data.station_num
      this.pig_num = res.data.pig_num
    })
  },
  // activated() {
  //     this.handleListener();
  // },
  // deactivated() {
  //     window.removeEventListener('resize', this.renderChart);
  //     bus.$off('collapse', this.handleBus);
  // },
  methods: {
    // changeDate () {
    //   const now = new Date().getTime()
    //   this.data.forEach((item, index) => {
    //     const date = new Date(now - (6 - index) * 86400000)
    //     item.name = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
    //   })
    // }
    // handleListener() {
    //     bus.$on('collapse', this.handleBus);
    //     // 调用renderChart方法对图表进行重新渲染
    //     window.addEventListener('resize', this.renderChart);
    // },
    // handleBus(msg) {
    //     setTimeout(() => {
    //         this.renderChart();
    //     }, 200);
    // }
  }
}
</script>

<style scoped>
  .grid-content {
    display: flex;
    align-items: center;
    height: 100px;
  }

  .grid-cont-right {
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: #999;
  }

  .grid-num {
    font-size: 30px;
    font-weight: bold;
  }

  .grid-con-icon {
    font-size: 50px;
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    color: #fff;
  }

  .grid-con-1 .grid-con-icon {
    background: rgb(45, 140, 240);
  }

  .grid-con-1 .grid-num {
    color: rgb(45, 140, 240);
  }

  .grid-con-2 .grid-con-icon {
    background: rgb(100, 213, 114);
  }

  .grid-con-2 .grid-num {
    color: rgb(100, 213, 114);
  }

  .grid-con-3 .grid-con-icon {
    background: rgb(242, 94, 67);
  }

  .grid-con-3 .grid-num {
    color: rgb(242, 94, 67);
  }

  .user-info {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 2px solid #ccc;
    margin-bottom: 20px;
  }

  .user-avator {
    width: 120px;
    height: 120px;
    border-radius: 50%;
  }

  .user-info-cont {
    padding-left: 50px;
    flex: 1;
    font-size: 14px;
    color: #999;
  }

  .user-info-cont div:first-child {
    font-size: 30px;
    color: #222;
  }

  .user-info-list {
    font-size: 14px;
    color: #999;
    line-height: 25px;
  }

  .user-info-list span {
    margin-left: 70px;
  }

  .mgb20 {
    margin-bottom: 20px;
  }

  .todo-item {
    font-size: 14px;
  }

</style>
