import Vue from 'vue'
import Router from 'vue-router'
import Center from "../components/Center";
import DataShare from "../components/DataShare";
import Index from "../components/Index";
import Register from "../components/Register";
import UploadFiles from "../components/UploadFiles";
import FileShow from "../components/FileShow";
import Login from "../components/Login";
import BookShow from "../components/BookShow";
import UploadBooks from "../components/UploadBooks";
import BookDetail from "../components/BookDetail";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/index'
    },
    {
      path: '/center',
      component:Center
    },{
      path: '/dataShare',
      component:DataShare
    },{
      path: '/index',
      component:Index
    },{
      path: '/register',
      component:Register
    },{
      path: '/dataShare/uploadFiles',
      component:UploadFiles
    },{
      path: '/dataShare/fileShow',
      component:FileShow
    },{
    path: '/login',
      component: Login
    },{
      path: '/bookShow',
      component: BookShow
    },{
      path: '/bookDetail/:id',
      name: 'BookInfo',
      component: BookDetail
    },{
      path: '/uploadBooks',
      component: UploadBooks
    }
  ]
})
