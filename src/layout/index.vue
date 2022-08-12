<template>
	<!-- 左侧菜单 -->
	<div v-if="settings.layout === 'left_menu'" :class="classObj">
		<VerticalSidbar v-if="settings.showLeftMenu" class="sidebar-container-vertical" />
		<div class="main-vertical-container">
			<Navbar v-if="settings.showTopNavbar" />
			<TagsView v-if="settings.showTagsView" />
			<AppMain />
		</div>
		<theme-button />
	</div>
	<!-- 顶部菜单 -->
	<div v-else>
		<HorizontalSidebar class="sidebar-container-horizontal" />
		<div class="main-horizontal-container">
			<TagsView v-if="settings.showTagsView" />
			<AppMain />
		</div>
		<theme-button />
	</div>
</template>
<!--原理vue2.0-->
<script lang="ts">
/*可以设置默认的名字*/
export default {
	name: 'Layout'
}
</script>

<script setup lang="ts">
import { VerticalSidbar,HorizontalSidebar, Navbar, AppMain, TagsView, ThemeButton } from './components'
import { computed } from 'vue'
import { useAppStore } from '@/store/app'
import ResizeHook from './hook/ResizeHandler'

const appStore = useAppStore()
const opened = computed(() => {
	return appStore.sidebar.opened
})

const settings = computed(() => {
	return appStore.settings
})
const classObj = computed(() => {
	return {
		closeSidebar: !opened.value,
		hideSidebar: !settings.value.showLeftMenu
	}
})
//import ResizeHook to   listen  page size that   open or close

ResizeHook()
</script>

<style lang="scss" scoped>
// 左侧菜单
.main-vertical-container {
	min-height: 100%;
	transition: margin-left 0.28s;
	margin-left: var(--side-bar-width);
	position: relative;
	border-left: 1px solid var(--layout-border-left-color);
}
.sidebar-container-vertical {
	transition: width 0.28s;
	width: var(--side-bar-width) !important;
	background-color: var(--el-menu-bg-color);
	height: 100%;
	position: fixed;
	font-size: 0;
	top: 0;
	bottom: 0;
	left: 0;
	z-index: 1001;
	overflow: hidden;
}
.closeSidebar {
	.sidebar-container-vertical {
		width: 54px !important;
	}
	.main-vertical-container {
		margin-left: 54px !important;
	}
}
.hideSidebar {
	.sidebar-container-vertical {
		width: 0 !important;
	}
	.main-vertical-container {
		margin-left: 0;
	}
}


// 右侧菜单
.sidebar-container-horizontal {
	transition: width 0.28s;
	width: 100%;
	background-color: #2b2f3a;
	height: 50px;
	position: fixed;
	font-size: 0;
	top: 0;
	bottom: 0;
	left: 0;
	z-index: 1001;
	overflow: hidden;
	display: flex;
	.sidebar-logo-container{
		width: 210px !important;
	}
}
.main-horizontal-container{
	min-height: 100%;
	position: relative;
	border-left: 1px solid var(--layout-border-left-color);
	height: calc(100% - 50px);
	margin-top: 50px;
}
</style>
