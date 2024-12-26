import Vue from "vue"
import VueRouter from "vue-router"
Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    name:'HomeView',
    component: ()=>import('@/pages/HomeView.vue'),
    redirect:'/createMap',
    children:[
      {
        path:'/CreateMap',
        name: 'CreateMap',
        component:()=>import('../pages/CreateMap.vue')
      },
      {
        path:'/CreateTileLayer',
        name: 'CreateTileLayer',
        component: () => import('../pages/CreateTileLayer.vue')
      },
      {
        path:'/CreateLegend',
        name: 'CreateLegend',
        component: () => import('../pages/CreateLegend.vue')
      },
      {
        path:'/CreateDynamicLayer',
        name: 'CreateDynamicLayer',
        component: () => import('../pages/CreateDynamicLayer.vue')
      },
      {
        path:'/DrawLine',
        name: 'DrawLine',
        component: () => import('../pages/DrawLine.vue')
      },
      {
        path:'/DrawPoint',
        name: 'DrawPoint',
        component: () => import('../pages/DrawPoint.vue')
      },
      {
        path:'/DrawPolygon',
        name: 'DrawPolygon',
        component: () => import('../pages/DrawPolygon.vue')
      },
      {
        path:'/FullScreen',
        name: 'FullScreen',
        component: () => import('../pages/FullScreen.vue')
      },
      {
        path:'/JudgeUrl',
        name: 'JudgeUrl',
        component: () => import('../pages/JudgeUrl.vue')
      },
      {
        path:'/GisLocation',
        name: 'GisLocation',
        component: () => import('../pages/GisLocation.vue')
      },
      {
        path:'/MeasureArea',
        name: 'MeasureArea',
        component: () => import('../pages/MeasureArea.vue')
      },
      {
        path:'/MeasureDistance',
        name: 'MeasureDistance',
        component: () => import('../pages/MeasureDistance.vue')
      },
      {
        path:'/SliceScreen',
        name: 'SliceScreen',
        component: () => import('../pages/SliceScreen.vue')
      },
      {
        path:'/SliceScreen',
        name: 'SliceScreen',
        component: () => import('../pages/SliceScreen.vue')
      },
      {
        path:'/UseIdentify',
        name: 'UseIdentify',
        component: () => import('../pages/UseIdentify.vue')
      },
      {
        path:'/UseQuery',
        name: 'UseQuery',
        component: () => import('../pages/UseQuery.vue')
      },
      {
        path:'/UseFind',
        name: 'UseFind',
        component: () => import('../pages/UseFind.vue')
      },
      {
        path:'/EventListener',
        name: 'EventListener',
        component: () => import('../pages/eventListener.vue')
      },
    ]
  }
]

const router = new VueRouter({
  routes
})
export default router