<!-- <script lang="ts" setup>
import Sidebar from './Sidebar/index.vue'
</script>

<template>
	 <el-container>
      <el-aside>
				<Sidebar />
			</el-aside>
      <el-container>
        <el-header>Header</el-header>
        <el-main>
					<router-view></router-view>
				</el-main>
      </el-container>
    </el-container>
</template>

<style lang="scss" scoped>
.el-container{
	height: 100%;
}
</style> -->
<template>
	<div :class="classObj" class="layout-wrapper">
		<!--left side-->
		<Sidebar v-if="settings.showLeftMenu" class="sidebar-container" />
		<!--right container-->
		<div class="main-container">
			<Navbar v-if="settings.showTopNavbar" />
			<TagsView v-if="settings.showTagsView" />
			<AppMain />
		</div>
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
import { Sidebar, Navbar, AppMain, TagsView } from './components'
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
.main-container {
	min-height: 100%;
	transition: margin-left 0.28s;
	margin-left: var(--side-bar-width);
	position: relative;
	border-left: 1px solid var(--layout-border-left-color);
}
.sidebar-container {
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
	.sidebar-container {
		width: 54px !important;
	}
	.main-container {
		margin-left: 54px !important;
	}
}
.hideSidebar {
	.sidebar-container {
		width: 0 !important;
	}
	.main-container {
		margin-left: 0;
	}
}
</style>
