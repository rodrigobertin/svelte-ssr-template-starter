import {Router} from 'svelte-pilot'
import DashBoard from "./views/DashBoard.svelte";
import Admin from "./views/Admin.svelte";

export default new Router({
  routes: [
    {
      component: () => import('./components/Layout.svelte'),
      children:[
        {
          path: '/',
          component:()=> import('./views/Home.svelte'),
        }
      ]
    },
    {
      component:()=> import('./components/Layout.svelte'),
      beforeEnter:(_)=>{
        console.log(_)
      },
      children: [
        {
          path: '/admin',
          component: Admin
        },
        {
          path: '/admin/home',
          component: DashBoard
        }
      ],
    }
  ]
})
