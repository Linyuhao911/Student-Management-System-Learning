import Vue from 'vue'
import VueRouter from 'vue-router'

// 解决重复点击路由报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Manager',
    component: () => import('../views/Manager.vue'),
    redirect: '/home',
    children: [
      { path: '403', name: 'Auth', meta: { name: '无权限' }, component: () => import('../views/manager/Auth.vue') },
      { path: 'home', name: 'ManagerHome', meta: { name: '系统首页' }, component: () => import('../views/manager/Home.vue') }, // 修复同名路由冲突
      { path: 'admin', name: 'Admin', meta: { name: '管理员信息', requireAdmin: true }, component: () => import('../views/manager/Admin.vue') }, // 标记管理员权限
      { path: 'user', name: 'User', meta: { name: '用户信息', requireAdmin: true }, component: () => import('../views/manager/User.vue') }, // 标记管理员权限
      { path: 'person', name: 'ManagerPerson', meta: { name: '个人信息' }, component: () => import('../views/manager/Person.vue') }, // 修复同名路由冲突
    ]
  },
  {
    path: '/front',
    name: 'Front',
    component: () => import('../views/front/Front.vue'),
    redirect: '/front/home',
    children: [
      { path: 'home', name: 'FrontHome', meta: { name: '首页信息' }, component: () => import('../views/front/Home.vue') }, // 修复同名路由冲突
      { path: 'person', name: 'FrontPerson', meta: { name: '个人信息' }, component: () => import('../views/front/Person.vue') }, // 修复同名路由冲突
      { path: 'password', name: 'Password', meta: { name: '修改密码' }, component: () => import('../views/front/Password.vue') },
    ]
  },
  { path: '/login', name: 'Login', meta: { name: '登录' }, component: () => import('../views/Login.vue') },
  { path: '/register', name: 'Register', meta: { name: '注册' }, component: () => import('../views/Register.vue') },
  { path: '*', name: 'page-404', meta: { name: '无法访问' }, component: () => import('../views/404.vue')},
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 全局前置守卫
router.beforeEach((to, from, next) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  if (to.path === '/'){
    if (user.role){
      if (user.role === 'ADMIN'){
        next('/home')
      } else {
        next('/front/home')
      }
    } else {
      next('/login')
    }
  } else {
    if (to.matched.length === 0){
      next('/404')
      return
    } else {
      next()
    }
  }
})

export default router
