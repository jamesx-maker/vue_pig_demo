import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
    meta: { title: '登录' }
  },
  {
    path: '/home',
    component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
    meta: { title: '自述文件' },
    children: [
      {
        path: '/index',
        component: () => import(/* webpackChunkName: "dashboard" */ '../components/pages/System_index.vue'),
        meta: { title: '系统首页' }
      },
      {
        path: '/station_info',
        component: () => import(/* webpackChunkName: "dashboard" */ '../components/pages/1_stationinfo/Station_info'),
        meta: { title: '饲喂站信息' }
      },
      {
        path: '/addition_pig',
        component: () => import(/* webpackChunkName: "form" */ '../components/pages/2_pigmanage/addition_pig'),
        meta: { title: '入栏' }
      },
      {
        path: '/subtraction_pig',
        component: () => import(/* webpackChunkName: "form" */ '../components/pages/2_pigmanage/subtraction_pig'),
        meta: { title: '离栏' }
      },
      {
        path: '/change_station',
        component: () => import(/* webpackChunkName: "form" */ '../components/pages/2_pigmanage/changestation'),
        meta: { title: '转栏' }
      },
      {
        path: '/change_ear',
        component: () => import(/* webpackChunkName: "form" */ '../components/pages/2_pigmanage/change_ear'),
        meta: { title: '更换耳标' }
      },
      {
        path: '/setintake',
        component: () => import(/* webpackChunkName: "form" */ '../components/pages/2_pigmanage/setintake'),
        meta: { title: '下料设置' }
      },
      {
        path: '/farrow',
        component: () => import(/* webpackChunkName: "form" */ '../components/pages/3-data/farrow'),
        meta: { title: '生产信息' }
      },
      {
        path: '/delivery_warn',
        component: () => import(/* webpackChunkName: "form" */ '../components/pages/3-data/delivery_warn'),
        meta: { title: '分娩提醒' }
      },
      {
        path: '/intake_data',
        component: () => import(/* webpackChunkName: "form" */ '../components/pages/3-data/intakedata'),
        meta: { title: '采食信息' }
      },
      {
        path: '/default_intake',
        component: () => import(/* webpackChunkName: "form" */ '../components/pages/7-setting/defaultintake'),
        meta: {
          title: '默认饲喂量',
          permission: true
        }
      },
      {
        path: '/food_consume',
        component: () => import(/* webpackChunkName: "form" */ '../components/pages/3-data/food_consume'),
        meta: { title: '饲料消耗' }
      },
      {
        path: '/linefit',
        component: () => import(/* webpackChunkName: "form" */ '../components/pages/4_analysis/linefit'),
        meta: {
          title: '背膘变化模拟',
          permission: true
        }
      },
      {
        path: '/intake_spread',
        component: () => import(/* webpackChunkName: "form" */ '../components/pages/4_analysis/intakespread'),
        meta: {
          title: '采食分布',
          permission: true
        }
      },
      {
        path: '/errorcode',
        component: () => import(/* webpackChunkName: "form" */ '../components/pages/5_machinemanage/errorcode'),
        meta: { title: '故障码' }
      },
      {
        path: '/usersetting',
        component: () => import(/* webpackChunkName: "form" */ '../components/pages/6_usermanage/usersetting'),
        meta: { title: '用户设置' }
      },
      {
        path: '/othersetting',
        component: () => import(/* webpackChunkName: "form" */ '../components/pages/6_usermanage/othersetting'),
        meta: { title: '其他设置' }
      },
      {
        path: '/pigreport',
        component: () => import(/* webpackChunkName: "form" */ '../components/pages/3-data/pigreport'),
        meta: { title: '母猪报告' }
      },
      {
        path: '/errorreport',
        component: () => import(/* webpackChunkName: "form" */ '../components/pages/3-data/errorreport'),
        meta: { title: '异常信息报告' }
      },
      {
        path: '/test',
        component: () => import(/* webpackChunkName: "form" */ '../components/pages/test'),
        meta: { title: '测试页面' }
      },
      // 默认
      // 默认
      // 默认
      {
        path: '/table',
        component: () => import(/* webpackChunkName: "table" */ '../components/pages/BaseTable.vue'),
        meta: { title: '基础表格' }
      },
      {
        path: '/tabs',
        component: () => import(/* webpackChunkName: "tabs" */ '../components/pages/Tabs.vue'),
        meta: { title: 'tab选项卡' }
      },
      {
        // 国际化组件
        path: '/i18n',
        component: () => import(/* webpackChunkName: "i18n" */ '../components/pages/I18n.vue'),
        meta: { title: '国际化' }
      },
      {
        // 权限页面
        path: '/permission',
        component: () => import(/* webpackChunkName: "permission" */ '../components/pages/Permission.vue'),
        meta: {
          title: '权限测试',
          permission: true
        }
      },
      {
        path: '/404',
        component: () => import(/* webpackChunkName: "404" */ '../components/pages/404.vue'),
        meta: { title: '404' }
      },
      {
        path: '/403',
        component: () => import(/* webpackChunkName: "403" */ '../components/pages/403.vue'),
        meta: { title: '403' }
      }
    ]
  },
  {
    path: '*',
    redirect: '/404'
  }
]

const router = new VueRouter({
  routes
})

// 挂载路由导航守卫
// 使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
  // to:将要访问的路径
  // from:代表从哪个路径跳转
  // next放行
  document.title = `${to.meta.title} | HZAU-pig-system`
  const role = localStorage.getItem('ms_username')
  // const tokenStr = window.sessionStorage.getItem('token')
  // if (!tokenStr) return next('/login')
  if (!role && to.path !== '/login') {
    next('/login')
  } else if (to.meta.permission) {
    // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
    role === 'admin' ? next() : next('/403')
  } else {
    // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
    if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor') {
      Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
        confirmButtonText: '确定'
      })
    } else {
      next()
    }
  }
})

export default router
