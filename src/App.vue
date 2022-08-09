<template>
	<div id="app">
		<el-config-provider :locale="locale">
			<router-view></router-view>
		</el-config-provider>
	</div>
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import en from 'element-plus/dist/locale/en.mjs'
import { useAppStore } from '@/store/app'
const appStore = useAppStore()
const locale = computed(() => (appStore.settings.elementlanguage === 'zh-cn' ? zhCn : en))
</script>
