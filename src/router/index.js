import { createRouter, createWebHashHistory } from 'vue-router'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: ()=>import('@/views/Home.vue')
  },
  {
    path:'/citybus',
    name:'citybus',
    component:()=>import('@/views/stationInfo/CityBus.vue')
  },
  {
    path:'/roadpassengertransport',
    name:'roadpassengertransport',
    component:()=>import('@/views/stationInfo/RoadPassengerT.vue')
  },
  {
    path:'/rideplan',
    name:'rideplan',
    component:()=>import('@/views/stationInfo/Rideplan.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
