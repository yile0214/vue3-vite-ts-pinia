import { login, userInfo } from '@/api/user'
import { setToken, removeToken } from '@/utils/auth'
import { ObjTy } from '~/common'
import router, { constantRoutes, asyncRoutes } from '@/router'
import { defineStore } from 'pinia'
import { usePermissionStore } from '@/store/permission'
import { useTagsViewStore } from '@/store/tagsView'

const resetRouter = () => {
	const asyncRouterNameArr: Array<any> = asyncRoutes.map(mItem => mItem.name)
	asyncRouterNameArr.forEach(name => {
		if (router.hasRoute(name)) {
			router.removeRoute(name)
		}
	})
}

export const useUserStore = defineStore('user', {
	state: () => {
		return {
			username: '',
			avatar: '',
			roles: [] as Array<any>
		}
	},

	actions: {
		M_username(username: string) {
			this.$patch(state => {
				state.username = username
			})
		},
		M_roles(roles: Array<string>) {
			this.$patch(state => {
				state.roles = roles
			})
		},

		login(user: string, password: string) {
			return new Promise<void>((resolve, reject) => {
				login(user, password)
					.then((res: ObjTy) => {
						setToken(res?.userToken)
						resolve()
					})
					.catch((error: any) => {
						reject(error)
					})
			})
		},
		// get user info
		getInfo() {
			return new Promise((resolve, reject) => {
				userInfo()
					.then((res: ObjTy) => {
						this.M_username(res.name)
						this.M_roles(res.roleIds)
						resolve(res)
					})
					.catch((error: any) => {
						reject(error)
					})
			})
		},
		// user logout
		logout() {
			return new Promise((resolve, reject) => {
				// logoutReq()
				//   .then(() => {
				//     this.resetState()
				//     resolve(null)
				//   })
				//   .catch((error: any) => {
				//     reject(error)
				//   })
			})
		},
		resetState() {
			return new Promise(resolve => {
				this.M_username('')
				this.M_roles([])
				removeToken() // must remove  token  first
				resetRouter() // reset the router
				const permissionStore = usePermissionStore()
				permissionStore.M_isGetUserInfo(false)
				const tagsViewStore = useTagsViewStore()
				tagsViewStore.delAllViews()
				resolve(null)
			})
		}
	}
})
