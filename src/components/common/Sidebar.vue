<template>
  <div class="sidebar">
    <el-menu
      class="sidebar-el-menu"
      :default-active="onRoutes"
      :collapse="collapse"
      background-color="#324157"
      text-color="#bfcbd9"
      active-text-color="#20a0ff"
      unique-opened
      router
    >
      <template v-for="item in items">
        <template v-if="item.subs">
          <el-submenu :index="item.index" :key="item.index">
            <template slot="title">
              <i :class="item.icon"></i>
              <span slot="title">{{ item.title }}</span>
            </template>
            <template v-for="subItem in item.subs">
              <el-submenu
                v-if="subItem.subs"
                :index="subItem.index"
                :key="subItem.index"
              >
                <template slot="title">{{ subItem.title }}</template>
<!--                <el-menu-item-->
<!--                  v-for="(threeItem,i) in subItem.subs"-->
<!--                  :key="i"-->
<!--                  :index="threeItem.index"-->
<!--                >{{ threeItem.title }}-->
<!--                </el-menu-item>-->
              </el-submenu>
              <el-menu-item
                v-else
                :index="subItem.index"
                :key="subItem.index"
              >{{ subItem.title }}
              </el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.index" :key="item.index">
            <i :class="item.icon"></i>
            <span slot="title">{{ item.title }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
import bus from '../common/bus'

export default {
  data () {
    return {
      collapse: false,
      items: [
        {
          icon: 'el-icon-monitor',
          index: 'index',
          title: '系统首页'
        },
        {
          icon: 'el-icon-house',
          index: 'station_info',
          title: '饲喂站信息'
        },
        {
          icon: 'el-icon-magic-stick',
          index: 'pig_manage',
          title: '母猪管理',
          subs: [
            {
              index: 'addition_pig',
              title: '入栏'
            },
            {
              index: 'subtraction_pig',
              title: '离栏'
            },
            {
              index: 'change_station',
              title: '转栏'
            },
            {
              index: 'change_ear',
              title: '更换耳标'
            },
            {
              index: 'setintake',
              title: '下料设置'
            },
            {
              index: 'farrow',
              title: '生产信息'
            },
            {
              index: 'delivery_warn',
              title: '分娩提醒'
            }
          ]
        },
        {
          icon: 'el-icon-s-data',
          index: 'data',
          title: '数据查询',
          subs: [
            {
              index: 'intake_data',
              title: '采食信息'
            },
            {
              index: 'default_intake',
              title: '默认饲喂量'
            },
            {
              index: 'food_consume',
              title: '饲料消耗'
            }
          ]
        },
        {
          icon: 'el-icon-data-line',
          index: 'analysis',
          title: '统计分析',
          subs: [
            {
              index: 'growfit',
              title: '生长拟合'
            },
            {
              index: 'intake_spread',
              title: '采食分布'
            }
          ]
        },
        {
          icon: 'el-icon-data-line',
          index: 'machine_manage',
          title: '设备管理',
          subs: [
            {
              index: 'errorcode',
              title: '故障码'
            }
          ]
        },
        {
          icon: 'el-icon-user',
          index: 'usermanage',
          title: '用户管理',
          subs: [
            {
              index: 'usersetting',
              title: '用户设置'
            },
            {
              index: 'othersetting',
              title: '其他设置'
            }
          ]
        },
        {
          icon: 'el-icon-user',
          index: 'reporter',
          title: '报告',
          subs: [
            {
              index: 'pigreport',
              title: '母猪报告'
            },
            {
              index: 'errorreport',
              title: '异常信息报告'
            }
          ]
        },
        {
          icon: 'el-icon-lx-emoji',
          index: 'icon',
          title: '自定义图标'
        },
        {
          icon: 'el-icon-lx-global',
          index: 'i18n',
          title: '国际化功能'
        },
        {
          icon: 'el-icon-lx-warn',
          index: '7',
          title: '错误处理',
          subs: [
            {
              index: 'permission',
              title: '权限测试'
            },
            {
              index: '404',
              title: '404页面'
            }
          ]
        }
      ]
    }
  },
  computed: {
    onRoutes () {
      return this.$route.path.replace('/', '')
    }
  },
  created () {
    // 通过 Event Bus 进行组件间通信，来折叠侧边栏
    bus.$on('collapse', msg => {
      this.collapse = msg
      bus.$emit('collapse-content', msg)
    })
  }
}
</script>

<style scoped>
  .sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
  }

  .sidebar::-webkit-scrollbar {
    width: 0;
  }

  .sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
  }

  .sidebar > ul {
    height: 100%;
  }
</style>
