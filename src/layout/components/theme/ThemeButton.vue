<template>
	<div class="rightDrawer">
		<el-drawer v-model="openDrawer" size="20%" title="系统配置">
			<el-divider>暗黑模式</el-divider>
			<div class="swicth_flex flex-center">
				<div class="dark" @click="changeDark">
					<div class="dark_block" :class="{ active: darkActive }" />
					<svg-icon icon-class="sun" />
					<svg-icon icon-class="moon" />
				</div>
			</div>
			<el-divider>主题色</el-divider>
			<div class="theme_color">
				<div
					v-for="color in predefineColors"
					:key="color"
					:style="{ backgroundColor: color }"
					class="color_block"
					@click="colorChange(color)"
				>
					<el-icon v-show="themeColor === color">
						<Check />
					</el-icon>
				</div>
				<el-color-picker v-model="systeamColor" :predefine="predefineColors" @change="colorChange" />
			</div>
			<el-divider>布局</el-divider>
			<div class="menu">
				<div class="left_menu" :class="settings.layout === 'left_menu' ? 'active' : ''" @click="changeMenu('left_menu')"></div>
				<div class="top_menu" :class="settings.layout === 'top_menu' ? 'active' : ''" @click="changeMenu('top_menu')"></div>
			</div>
			<el-divider>其他配置</el-divider>
			<div class="swicth_flex">
				<span>sidebarLogo</span>
				<el-switch
					v-model="settings.sidebarLogo"
					active-text="on"
					inactive-text="off"
					inline-prompt
					@change="change('sidebarLogo')"
				/>
			</div>
			<div class="swicth_flex">
				<span>showNavbarTitle</span>
				<el-switch
					v-model="settings.showNavbarTitle"
					active-text="on"
					inactive-text="off"
					inline-prompt
					@change="change('showNavbarTitle')"
				/>
			</div>
			<div class="swicth_flex">
				<span>showHamburger</span>
				<el-switch
					v-model="settings.showHamburger"
					active-text="on"
					inactive-text="off"
					inline-prompt
					@change="change('showHamburger')"
				/>
			</div>
			<div class="swicth_flex">
				<span>showTagsView</span>
				<el-switch
					v-model="settings.showTagsView"
					active-text="on"
					inactive-text="off"
					inline-prompt
					@change="change('showTagsView')"
				/>
			</div>
		</el-drawer>
		<div class="rightPanel">
			<el-button
				class="handle-button"
				type="primary"
				:class="{ 'handle-button-close': !openDrawer }"
				:style="{ top: '250px' }"
				@click="openDrawer = !openDrawer"
			>
				<el-icon><Setting /></el-icon>
			</el-button>
		</div>
	</div>
</template>
<script lang="ts" setup>
import { Check } from '@element-plus/icons-vue'
import { ref, reactive, onMounted } from 'vue'
import { Setting } from '@element-plus/icons-vue'
import { useAppStore } from '@/store/app'
// import { useDark, useToggle } from '@vueuse/core'
let darkActive = ref(false)
darkActive.value = !!localStorage.getItem('project_dark')
const changeDark = () => {
	let flag = !localStorage.getItem('project_dark')
	if (flag) {
		darkActive.value = true
		document.getElementsByTagName('html')[0].className = 'dark'
		localStorage.setItem('project_dark', 'dark')
	} else {
		darkActive.value = false
		document.getElementsByTagName('html')[0].className = ''
		localStorage.setItem('project_dark', '')
	}
	// useToggle(isDark)
}
// ====================   主题色   ======================
const predefineColors = ref<string[]>(['#409eff', '#f5222d', '#fa541c', '#faad14', '#13c2c2', '#52c41a', '#2f54eb', '#722ed1'])
const openDrawer = ref<boolean>(false)
const defaultColor: string = localStorage.getItem('primaryColor') || '#1890ff'
const systeamColor = ref<string>(defaultColor)
const mix = (color1: string, color2: string, weight: number) => {
	weight = Math.max(Math.min(Number(weight), 1), 0)
	let r1 = parseInt(color1.substring(1, 3), 16)
	let g1 = parseInt(color1.substring(3, 5), 16)
	let b1 = parseInt(color1.substring(5, 7), 16)
	let r2 = parseInt(color2.substring(1, 3), 16)
	let g2 = parseInt(color2.substring(3, 5), 16)
	let b2 = parseInt(color2.substring(5, 7), 16)
	let r: string | number = Math.round(r1 * (1 - weight) + r2 * weight)
	let g: string | number = Math.round(g1 * (1 - weight) + g2 * weight)
	let b: string | number = Math.round(b1 * (1 - weight) + b2 * weight)
	r = ('0' + (r || 0).toString(16)).slice(-2)
	g = ('0' + (g || 0).toString(16)).slice(-2)
	b = ('0' + (b || 0).toString(16)).slice(-2)
	return '#' + r + g + b
}
const themeColor = ref<string>('')
themeColor.value = localStorage.getItem('primaryColor') || ''
const colorChange = (color: string = defaultColor): void => {
	const pre = '--el-color-primary'
	// 白色混合色
	const mixWhite = '#ffffff'
	// 黑色混合色
	const mixBlack = '#000000'
	const el = document.documentElement
	localStorage.setItem('primaryColor', color)
	themeColor.value = color
	el.style.setProperty(pre, color)
	// 这里是覆盖原有颜色的核心代码
	for (let i = 1; i < 10; i += 1) {
		el.style.setProperty(`${pre}-light-${i}`, mix(color, mixWhite, i * 0.1))
	}
	el.style.setProperty('--el-color-primary-dark', mix(color, mixBlack, 0.1))
	// 本地缓存style，样式持久化，你也可以存在后端
	localStorage.setItem('style', el.style.cssText)
}
onMounted(() => {
	colorChange()
	if (localStorage.getItem('project_dark') === 'dark') {
		document.getElementsByTagName('html')[0].className = 'dark'
	}
})
// ====================   设置   ======================
const appStore = useAppStore()
const settings = reactive({
	sidebarLogo: true,
	showNavbarTitle: true,
	showHamburger: true,
	showTagsView: true,
	layout: ''
})
Object.keys(settings).forEach(key => {
	settings[key] = appStore.settings[key]
})
const change = (key: string): void => {
	appStore.M_settings({ [key]: settings[key] })
}
const changeMenu = (value: string): void => {
	settings['layout'] = value
	appStore.M_settings({ layout: value })
}
</script>
<style lang="scss" scoped>
.rightDrawer {
	.dark {
		position: relative;
		display: flex;
		width: 50px;
		height: 26px;
		cursor: pointer;
		background-color: #151515;
		border-radius: 30px;
		padding: 0 6px;
		justify-content: space-between;
		align-items: center;
		font-size: 14px;
		border: 1px solid rgb(210, 207, 207);
		.dark_block {
			position: absolute;
			width: 16px;
			height: 16px;
			border-radius: 50%;
			background-color: #fff;
			z-index: 1;
			transition: all 0.25s cubic-bezier(0.7, 0.3, 0.1, 1);
			left: 6px;
		}
		.active {
			left: 28px;
		}
	}
	.theme_color {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.color_block {
		width: 20px;
		height: 20px;
		cursor: pointer;
		border: 1px solid #ddd;
		border-radius: 2px;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #fff;
	}
	.menu {
		display: flex;
		justify-content: center;
		div {
			margin: 0 10px;
			width: 56px;
			height: 48px;
			border-radius: 4px;
			background-color: #f0f2f5;
			overflow: hidden;
			position: relative;
			box-shadow: 0 1px 2.5px #0000002e;
			cursor: pointer;
			&:hover {
				border: 2px solid #0960bd;
			}
		}
		.active {
			border: 2px solid #0960bd;
		}
		.left_menu {
			&:before {
				content: '';
				display: block;
				height: 100%;
				width: 22%;
				background-color: #273352;
				position: absolute;
				left: 0;
			}
			&:after {
				content: '';
				display: block;
				height: 22%;
				width: 78%;
				background-color: #fff;
				position: absolute;
				right: 0;
			}
		}
		.top_menu {
			&:after {
				content: '';
				display: block;
				height: 22%;
				width: 100%;
				background-color: #273352;
				position: absolute;
				right: 0;
			}
		}
	}
	.swicth_flex {
		display: flex;
		justify-content: space-between;
	}
	.flex-center {
		justify-content: center;
	}
}

.rightPanel {
	width: 100%;
	max-width: 350px;
	height: 100vh;
	position: fixed;
	padding: 24px;
	top: 0;
	right: 0;
	box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.05);
	transition: all 0.25s cubic-bezier(0.7, 0.3, 0.1, 1);
	transform: translate(100%);
	background: #fff;
	z-index: 2000;

	.handle-button {
		width: 48px;
		height: 48px;
		position: absolute;
		left: -48px;
		text-align: center;
		font-size: 24px;
		border-radius: 6px 0 0 6px !important;
		z-index: 0;
		pointer-events: auto;
		cursor: pointer;
		color: #fff;
		line-height: 48px;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}
	.handle-button-close {
		left: -8px;
		&:hover {
			left: -48px;
		}
	}
}
</style>
