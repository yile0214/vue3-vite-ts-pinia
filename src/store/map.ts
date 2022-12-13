import { defineStore } from 'pinia'
export const useMapStore = defineStore('map', {
	state: () => {
		return {
			isAddLine: false
		}
	},

	/***
	 *封装处理数据的函数（业务逻辑)：修改数据
	 */
	actions: {
		SET_IsAddLine(flag: boolean) {
			this.isAddLine = flag
		}
	}
})
