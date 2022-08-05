import { createRouter, createWebHashHistory } from 'vue-router'
import { RouterTy } from '~/router'
export const constantRoutes: RouterTy = [
	// {
	// 	path:"/",
	// 	redirect:'/home',
	// 	hidden:true
	// },
	// {
	// 	path:"/home",
	// 	component:()=>import('@/views/home/index.vue'),
	// },
	{
		path: '/',
		name: 'Home',
		redirect: '/layout1',
		component: () => import('@/layout/index.vue'),
		meta: { title: '首页' },
		alwaysShow: true,
		children: [
			{
				path: 'layout1',
				name: 'Layout1',
				component: () => import('@/views/home/index.vue'),
				meta: { title: '测试12' }
			},
			{
				path: 'layout2',
				name: 'Layout2',
				component: () => import('@/views/home/index2.vue'),
				meta: { title: '测试23' }
			}
		]
	}
]

export const asyncRoutes: RouterTy = []

const router = createRouter({
	history: createWebHashHistory(),
	routes: constantRoutes
})

export default router
