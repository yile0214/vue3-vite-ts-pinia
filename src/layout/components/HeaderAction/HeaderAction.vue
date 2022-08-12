<template>
<div class="right-menu">
	<el-dropdown trigger="click" size="medium">
		<div class="avatar-wrapper">
			<img src="https://github.jzfai.top/file/images/nav-right-logo.gif" class="user-avatar" />
			<CaretBottom style="width: 1em; height: 1em; margin-left: 4px" />
		</div>
		<template #dropdown>
			<el-dropdown-menu>
				<router-link to="/">
					<el-dropdown-item>Home</el-dropdown-item>
				</router-link>
				<a target="_blank" href="https://github.com/yile0214/vue3-vite-ts-pinia">
					<el-dropdown-item>Github</el-dropdown-item>
				</a>
				<!--<el-dropdown-item>修改密码</el-dropdown-item>-->
				<el-dropdown-item divided @click="loginOut">login out</el-dropdown-item>
			</el-dropdown-menu>
		</template>
	</el-dropdown>
</div>
</template>
<script setup lang="ts">
import { useUserStore } from '@/store/user'
import { useRouter } from 'vue-router'
import { CaretBottom } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
/*
 * 退出登录
 * */
const router = useRouter()
const loginOut = () => {
	const userStore = useUserStore()
	userStore.logout().then(() => {
		ElMessage({ message: '退出登录成功', type: 'success' })
		router.push(`/login?redirect=/`)
	})
}
</script>
<style lang="scss" scoped>
//logo
.avatar-wrapper {
	margin-top: 5px;
	position: relative;
	cursor: pointer;

	.user-avatar {
		cursor: pointer;
		width: 40px;
		height: 40px;
		border-radius: 10px;
	}

	.el-icon-caret-bottom {
		cursor: pointer;
		position: absolute;
		right: -20px;
		top: 25px;
		font-size: 12px;
	}
}
//drop-down
.right-menu {
	cursor: pointer;
	margin-right: 20px;
	// background-color: var(--nav-bar-right-menu-background);
}
</style>
