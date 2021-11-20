import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/register', component: () => import('@/views/login/register'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },
  {
    path: '/service/valveinfo',
    component: Layout,
    redirect: '/service/valveinfo/getValveStatus',
    name: 'Valve',
    meta: { title: '专项审核', icon: 'example' },
    children: [
      {
        path: 'getRegister',
        name: 'Register',
        component: () => import('@/views/service/valveinfo/register'),
        meta: { title: '完整性登记表', icon: 'table' }
      },
      {
        path: 'getValveStatus',
        name: 'ValveStatus',
        component: () => import('@/views/service/valveinfo/list'),
        meta: { title: '审核情况登记表', icon: 'table' }
      },
      {
        path: 'getReviewValveStatus',
        name: 'ReviewValveStatus',
        component: () => import('@/views/service/valveinfo/干部职工基本信息审核表'),
        meta: {title: '干部职工基本信息审核表', icon: 'table'}
      },
      {
        path: 'getSpecialReview',
        name: 'SpecialReview',
        component: () => import('@/views/service/valveinfo/干部人事档案专项审核认定表'),
        meta: {title: '干部人事档案专项审核认定表', icon: 'table'}
      },
      {
        path: 'overview',
        name: 'reviewstatusOverview',
        component: () => import('@/views/service/valveinfo/审核情况一览表'),
        meta: {title: '审核情况一览表', icon: 'table'}
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
