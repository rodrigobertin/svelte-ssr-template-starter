import {Router} from 'svelte-pilot'
import Layout from "./components/Layout.svelte";
import DashBoard from "./views/DashBoard.svelte";

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
          component: DashBoard
        },
        {
          path: '/admin/home',
          component: DashBoard
        }
      ],
    }
  ]
})
