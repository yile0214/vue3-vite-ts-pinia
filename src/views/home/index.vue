<template>
	<!-- <div @click="user.$reset()">{{user.count}}-----{{count}}</div>
	<div @click="user.increment()">{{count2}}</div> -->
	<el-button mb-2 @click="toggle">Switch Language</el-button>
	<el-table mb-1 :data="[]" />
	<el-pagination :total="100" />
	<el-button type="primary">a</el-button>
</template>
<script lang="ts" setup>
// import { getList } from '@/api/user'
// import {storeToRefs} from "pinia"
import { ref, onMounted, computed } from 'vue'
import { useAppStore } from '@/store/app'
const appStore = useAppStore()
// const user = useUserStore()
// const { count,count2 } = storeToRefs(user)
// console.log(user,'user')
// getList()
// const language = ref('zh-cn')
// const locale = computed(() => (language.value === 'zh-cn' ? zhCn : en))
const toggle = () => {
	const elementlanguage = appStore.settings.elementlanguage === 'zh-cn' ? 'en' : 'zh-cn'
	appStore.M_settings({
		elementlanguage
	})
}
</script>
