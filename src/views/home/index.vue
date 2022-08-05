<template>
	<!-- <div @click="user.$reset()">{{user.count}}-----{{count}}</div>
	<div @click="user.increment()">{{count2}}</div> -->
	<div @click="changeTheme">测试1</div>
</template>
<script lang="ts" setup>
// import { getList } from '@/api/user'
// import {storeToRefs} from "pinia"
// const user = useUserStore()
// const { count,count2 } = storeToRefs(user)
// console.log(user,'user')
// getList()
const changeTheme = (): void => {
	document.getElementsByTagName('html')[0].className = 'dark'
}
</script>
