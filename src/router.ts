import {Router} from 'svelte-pilot'
import AdminLayout from "./components/AdminLayout.svelte";
import DashBoard from "./views/DashBoard.svelte";

export default new Router({
  routes: [
    {
      path: '/',
      component: () => import('./views/Home.svelte'),
    },
    {
      component:()=> import('./components/AdminLayout.svelte'),
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
