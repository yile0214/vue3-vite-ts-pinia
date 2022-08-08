<template>
	<div class="rightDrawer">
		<el-drawer v-model="openDrawer" size="20%" :with-header="false">
			<div class="slot-body">
				<div>主题色<el-color-picker v-model="systeamColor" :predefine="predefineColors" @change="colorChange" /></div>
				<div>sidebarLogo<el-switch v-model="settings.sidebarLogo" @change="change('sidebarLogo')" /></div>
				<div>showNavbarTitle<el-switch v-model="settings.showNavbarTitle" @change="change('showNavbarTitle')" /></div>
				<div>showHamburger<el-switch v-model="settings.showHamburger" @change="change('showHamburger')" /></div>
				<div>showTagsView<el-switch v-model="settings.showTagsView" @change="change('showTagsView')" /></div>
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
import { ref, reactive, onMounted } from 'vue'
import { Setting } from '@element-plus/icons-vue'
import { useAppStore } from '@/store/app'
// ====================   主题色   ======================
const predefineColors = ref(['#1890ff', '#f5222d', '#fa541c', '#faad14', '#13c2c2', '#52c41a', '#2f54eb', '#722ed1'])
const openDrawer = ref(false)
const defaultColor: string = localStorage.getItem('primaryColor') || '#1890ff'
const systeamColor = ref<string>(defaultColor)
const mix = (color1, color2, weight) => {
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
const colorChange = (color: string = defaultColor): void => {
	// e就是选择了的颜色
	console.log(localStorage.getItem('primaryColor'), 'sss')
	const pre = '--el-color-primary'
	// 白色混合色
	const mixWhite = '#ffffff'
	// 黑色混合色
	const mixBlack = '#000000'
	const el = document.documentElement
	localStorage.setItem('primaryColor', color)
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
})
// ====================   设置   ======================
const appStore = useAppStore()
const settings = reactive({
	sidebarLogo: true,
	showNavbarTitle: true,
	showHamburger: true,
	showTagsView: true
})
Object.keys(settings).forEach(key => {
	settings[key] = appStore.settings[key]
})
const change = (key: string): void => {
	appStore.M_settings({ [key]: settings[key] })
}
</script>
<style lang="scss" scoped>
.rightDrawer {
	.slot-body {
		padding: 20px;
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
