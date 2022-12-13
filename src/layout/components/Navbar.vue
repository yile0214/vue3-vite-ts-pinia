<template>
	<div class="navbar rowBC reset-el-dropdown">
		<div class="rowSC">
			<hamburger v-if="settings.showHamburger" :is-active="opened" class="hamburger-container" @toggleClick="toggleSideBar" />
			<breadcrumb class="breadcrumb-container" />
		</div>
		<!--nav title-->
		<div v-if="settings.showNavbarTitle" class="heardCenterTitle">{{ settings.title }}</div>
		<HeaderAction />
		<!-- <div v-if="settings.ShowDropDown" class="right-menu">
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
						<el-dropdown-item divided @click="loginOut">login out</el-dropdown-item>
					</el-dropdown-menu>
				</template>
			</el-dropdown>
		</div> -->
	</div>
</template>

<script setup lang="ts">
import Breadcrumb from './Breadcrumb'
import Hamburger from './Hamburger'
import HeaderAction from './HeaderAction'
import { computed } from 'vue'

import { useAppStore } from '@/store/app'

const settings = computed(() => {
	return appStore.settings
})
const opened = computed(() => {
	return appStore.sidebar.opened
})
const appStore = useAppStore()
const toggleSideBar = () => {
	appStore.M_toggleSideBar()
}
</script>

<style lang="scss" scoped>
.navbar {
	height: var(--nav-bar-height);
	overflow: hidden;
	position: relative;
	background: var(--nav-bar-background);
	box-shadow: var(--nav-bar-box-shadow);
	z-index: 1;
}
//center-title
.heardCenterTitle {
	text-align: center;
	position: absolute;
	top: 50%;
	left: 46%;
	font-weight: 600;
	font-size: 20px;
	transform: translate(-50%, -50%);
}
</style>
