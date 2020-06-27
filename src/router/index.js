import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: () => import(/* webpackChunkName: "login" */ '../components/pages/Login.vue'),
    meta: { title: '登录' }
  },
  {
    path: '/dashboard',
    component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
    meta: { title: '自述文件' },
    children: [
      {
        path: '/dashboard',
        component: () => import(/* webpackChunkName: "dashboard" */ '../components/pages/Dashboard.vue'),
        meta: { title: '系统首页' }
      },
      {
        path: '/icon',
        component: () => import(/* webpackChunkName: "icon" */ '../components/pages/Icon.vue'),
        meta: { title: '自定义图标' }
      },
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
        path: '/form',
        component: () => import(/* webpackChunkName: "form" */ '../components/pages/BaseForm.vue'),
        meta: { title: '基本表单' }
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
