<template>
	<div class="sidebar-logo-container" :class="{ collapse: collapse }">
		<transition name="sidebarLogoFade">
			<router-link v-if="collapse" key="collapse" class="sidebar-logo-link" to="/">
				<svg-icon v-if="logo" icon-class="sidebar-logo" class="sidebar-logo" />
				<h1 v-else class="sidebar-title">{{ title }}</h1>
			</router-link>
			<router-link v-else key="expand" class="sidebar-logo-link" to="/">
				<svg-icon v-if="logo" icon-class="sidebar-logo" class="sidebar-logo" />
				<h1 class="sidebar-title">{{ title }}</h1>
			</router-link>
		</transition>
	</div>
</template>

<script setup lang="ts">
import { reactive, toRefs } from 'vue'
import settings from '@/settings'
import SvgIcon from '@/icons/SvgIcon.vue'
defineProps({
	collapse: {
		type: Boolean,
		required: true
	}
})
const state = reactive({
	title: settings.title
	// logo: 'https://github.jzfai.top/file/images/pd-logo.svg'
})
//export to page for
const { title, logo } = toRefs(state)
</script>

<style lang="scss">
/*
   vue3.0 过度效果
   enter-> enter-from
   leave-> leave-from
  */
.sidebarLogoFade-enter-active {
	transition: opacity 2s;
}
.sidebarLogoFade-enter-from,
.sidebarLogoFade-leave-to {
	opacity: 0;
}
.sidebar-logo-container {
	position: relative;
	width: 100%;
	height: var(--el-menu-item-height);
	line-height: var(--el-menu-item-height);
	background: var(--sidebar-logo-background);
	padding-left: 14px;
	text-align: center;
	overflow: hidden;
	& .sidebar-logo-link {
		height: 100%;
		width: 100%;
		& .sidebar-logo {
			// color: var(--sidebar-logo-color);
			color: var(--el-color-primary);
			width: var(--sidebar-logo-width);
			height: var(--sidebar-logo-height);
			vertical-align: middle;
			margin-right: 12px;
		}
		& .sidebar-title {
			display: inline-block;
			margin: 0;
			color: var(--sidebar-logo-title-color);
			font-weight: 600;
			line-height: 50px;
			font-size: 20px;
			font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
			vertical-align: middle;
		}
	}
	&.collapse {
		.sidebar-logo {
			margin-right: 0;
		}
	}
}
</style>
