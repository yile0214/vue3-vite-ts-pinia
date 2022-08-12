<template>
	<div id="Sidebar" class="reset-menu-style">
		<!--logo-->
		<Logo v-if="settings.sidebarLogo" :collapse="!isCollapse" />
		<!--router nav-->
		<el-scrollbar>
			<el-menu
				class="el-menu-vertical"
				:default-active="activeMenu"
				:collapse="!isCollapse"
				:unique-opened="false"
				:collapse-transition="false"
				mode="vertical"
			>
				<sidebar-item v-for="routeItem in routes" :key="routeItem.path" :item="routeItem" :base-path="routeItem.path" />
			</el-menu>
		</el-scrollbar>
	</div>
</template>

<script setup lang="ts">
import Logo from './Logo.vue'
import SidebarItem from './SidebarItem.vue'
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
<style lang="scss">
//fix open the item style issue
.el-menu-vertical {
	width: var(--side-bar-width);
}
</style>
