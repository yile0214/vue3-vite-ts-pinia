import { defineStore } from 'pinia'
export const useSocketStore = defineStore('socket', {
	state: () => {
		return {
			ws: null, // scoket
			socketTimer: null,
			calcData: {} // 计算的结果
		}
	},

	/***
	 *封装处理数据的函数（业务逻辑)：修改数据
	 */
	actions: {
		// scoket
		set_ws(ws: any) {
			this.ws = ws
		},
		// 初始化socket
		socket_init(subTopic) {
			const ws = new WebSocket(import.meta.env.VITE_APP_WS)
			this.set_ws(ws)
			this.handle_open(subTopic)
			this.handle_close(subTopic)
			this.handle_error()
			this.handle_message()
		},
		// 监听连接
		handle_open(subTopic: any) {
			this.ws.onopen = () => {
				console.log('已连接')
				this.handle_send_message(subTopic)
			}
		},
		// 发送信息
		handle_send_message(subTopic: any) {
			console.log('handle_send_message', subTopic)
			this.ws.send(subTopic)
		},
		// 监听断开
		handle_close(subTopic: any) {
			this.ws.onclose = () => {
				console.log('已断开')
				if (this.socketTimer) {
					clearTimeout(this.socketTimer)
					this.socketTimer = null
				}
				this.handle_reconnect(subTopic)
			}
		},
		// 监听错误
		handle_error() {
			this.ws.onerror = () => {
				console.log('出错')
			}
		},
		// 监听消息
		handle_message() {
			this.ws.onmessage = event => {
				const res = JSON.parse(event.data)
				if (res.code === 11) {
					// MessageBox.confirm('登录失效，请重新登录', '确定退出登录', {
					// 	confirmButtonText: '重新登陆',
					// 	cancelButtonText: '取消',
					// 	type: 'warning'
					// }).then(() => {
					// 	dispatch('user/resetToken', null, { root: true }).then(() => {
					// 		location.reload()
					// 	})
					// })
				} else if (res.code === 0) {
					this.calcData = res.data
				}
			}
		},
		// 重连
		handle_reconnect(subTopic: any) {
			// 进行重连
			if (this.socketTimer) {
				clearTimeout(this.socketTimer)
				this.socketTimer = null
			}
			this.socketTimer = setTimeout(() => {
				this.socket_init(subTopic)
			}, 1000)
		}
	}
})
