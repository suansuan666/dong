import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Regist from '../views/Regist.vue'
import AllAwards from '../views/AllAwards.vue'
import ApplicationSummary from '../views/ApplicationSummary.vue'
import Awards from '../views/Awards.vue'
import Mine from '../views/Mine.vue'
import MyApplication from '../views/MyApplication.vue'
import MyAwards from '../views/MyAwards.vue'
import Notice from '../views/Notice.vue'
import AddNotice from '../views/AddNotice.vue'
import NoticeDetail from '../views/NoticeDetail.vue'
import ScholarshipIntro from '../views/ScholarshipIntro.vue'
import ScholarDetail from '../views/ScholarDetail.vue'
import AddScholarship from '../views/AddScholarship.vue'
import FindPassword from '../views/FindPassword.vue'
import AddWards from '../views/AddWards'
import Apply from '../views/Apply.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
 {
  path:'/find-password',
  name:'find-password',
  component:FindPassword
 },
 {
  path:'/regist',
  name:'regist',
  component:Regist
 },
  {
    path: '/home/:userId', 
    name:'home',
    component: Home,
    children: [
      {
        path:'',
        name:'notice',
        component:Notice
      },
      {
        path:'notice',
        name:'notice',
        component:Notice,
      },
      {
        path: 'all-awards',
        name: 'all-awards',
        component:AllAwards
      },
      {
        path: 'application-summary',
        name: 'application-summary',
        component:ApplicationSummary
      },
      {
        path: 'awards',
        name: 'awards',
        component:Awards
      },
      {
        path:'add-wards',
        name:'add-wards',
        component:AddWards
      },
      {
        path: 'mine',
        name: 'mine',
        component:Mine
      },
      {
        path: 'my-application',
        name: 'my-application',
        component:MyApplication
      },
      {
        path:'scholarship-intro',
        name:'scholarship-intro',
        component:ScholarshipIntro
      },
      {
        path:'scholar-detail/:id',
        name:'scholar-detail',
        component:ScholarDetail
      },
      {
        path:'my-awards',
        name:'my-awards',
        component:MyAwards
      },{
        path:'add-notice',
        name:'add-notice',
        component:AddNotice
      },
      {
        path:'notice-detail/:id',
        name:'notice-detail',
        component:NoticeDetail
      },
      {
        path:'add-scholarship',
        name:'add-scholarship',
        component:AddScholarship
      },
      {
        path:'apply',
        name:'apply',
        component:Apply
      },
      
    ]
  },
 
 
  
  
 
 
 
]

const router = new VueRouter({
  routes
})

export default router
