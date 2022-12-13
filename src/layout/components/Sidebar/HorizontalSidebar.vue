<template>
	<div id="Sidebar" class="reset-menu-style">
		<!--logo-->
		<div style="width: 210px">
			<Logo v-if="settings.sidebarLogo" :collapse="!isCollapse" />
		</div>
		<!--router nav-->
		<div class="horizontal_contain">
			<el-menu
				class="el-menu-horizontal"
				:default-active="activeMenu"
				:unique-opened="false"
				:collapse-transition="false"
				mode="horizontal"
			>
				<sidebar-item v-for="routeItem in routes" :key="routeItem.path" :item="routeItem" :base-path="routeItem.path" />
			</el-menu>
		</div>
		<HeaderAction />
	</div>
</template>

<script setup lang="ts">
import Logo from './Logo.vue'
import SidebarItem from './SidebarItem.vue'
import HeaderAction from '../HeaderAction'
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'
import { useAppStore } from '@/store/app'
// import { usePermissionStore } from '@/store/permission'
//导入配置文件
const appStore = useAppStore()
const settings = computed(() => {
	return appStore.settings
})

const route = useRoute()
const router = useRouter()
// const permissionStore = usePermissionStore()
const routes = computed(() => {
	// return permissionStore.routes
	console.log(router.options)
	return router.options.routes
})
const isCollapse = computed(() => {
	return appStore.sidebar.opened
})

const activeMenu = computed(() => {
	const { meta, path } = route
	// if set path, the sidebar will highlight the path you set
	if (meta.activeMenu) {
		return meta.activeMenu as string
	}
	return path
})
</script>
<style lang="scss" scoped>
.horizontal_contain {
	// width: calc(100% - 280px);
	flex: 1;
	.el-menu-horizontal {
		width: 100%;
	}
	--el-bg-color-overlay: none !important; // 隐藏横向菜单划过背景色
}
</style>
