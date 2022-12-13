import { createRouter, createWebHashHistory } from 'vue-router'
import { RouterTy } from '~/router'
/* Layout */
import Layout from '@/layout/index.vue'
export const constantRoutes: RouterTy = [
	{
		path: '/login',
		name: 'Login',
		component: () => import('@/views/login/index.vue'),
		meta: { title: '登录' },
		hidden: true
	},
	{
		path: '/',
		redirect: '/provinceController/province',
		hidden: true
	},
	{
		path: '/bMap',
		component: () => import('@/views/svgMap/bMap.vue')
	},
	{
		path: '/routeHistory',
		component: () => import('@/views/routeHistory/index.vue')
	},
	{
		path: '/provinceController',
		component: Layout,
		meta: { title: '省份管理', elSvgIcon: 'UserFilled' },
		children: [
			{
				path: 'province',
				name: 'Province',
				component: () => import('@/views/province/index.vue'),
				meta: { title: '省份管理' }
			}
		]
	},
	{
		path: '/companyController',
		component: Layout,
		meta: { title: '公司管理', elSvgIcon: 'UserFilled' },
		children: [
			{
				path: 'company',
				name: 'Company',
				component: () => import('@/views/company/index.vue'),
				meta: { title: '公司管理' }
			},
			{
				path: 'companyq',
				name: 'Companyq',
				component: () => import('@/views/company/index.vue'),
				meta: { title: '公司管理' }
			}
		]
	}

	// {
	//   path: '/userpermission',
	//   component: Layout,
	//   meta: { title: '用户管理', elSvgIcon: 'UserFilled' },
	//   children: [
	//     {
	//       path: 'app',
	//       name: 'App',
	//       component: () => import('@/views/userpermission/app/index.vue'),
	//       meta: { title: '应用管理' }
	//     },
	//     {
	//       path: 'dept',
	//       name: 'Dept',
	//       component: () => import('@/views/userpermission/dept/index.vue'),
	//       meta: { title: '部门管理' }
	//     },
	//     {
	//       path: 'menu',
	//       name: 'Menu',
	//       component: () => import('@/views/userpermission/menu/index.vue'),
	//       meta: { title: '菜单管理' }
	//     },
	//     {
	//       path: 'roles',
	//       name: 'Roles',
	//       component: () => import('@/views/userpermission/roles/index.vue'),
	//       meta: { title: '角色管理' }
	//     },
	//     {
	//       path: 'users',
	//       name: 'Users',
	//       component: () => import('@/views/userpermission/users/index.vue'),
	//       meta: { title: '用户管理' }
	//     }
	//   ]
	// },
	// {
	// 	path: '/',
	// 	name: 'Home',
	// 	redirect: '/userpermission/app',
	// 	component: Layout,
	// 	meta: { title: '首页' },
	// 	alwaysShow: true,
	// 	children: [
	// 		{
	// 			path: 'layout1',
	// 			name: 'Layout1',
	// 			component: () => import('@/views/home/index.vue'),
	// 			meta: { title: '测试12' }
	// 		},
	// 		{
	// 			path: 'layout2',
	// 			name: 'Layout2',
	// 			component: () => import('@/views/home/index2.vue'),
	// 			meta: { title: '测试23' }
	// 		}
	// 	]
	// }
]

export const asyncRoutes: RouterTy = []

const router = createRouter({
	history: createWebHashHistory(),
	routes: constantRoutes
})

export default router
