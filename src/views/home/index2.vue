<script lang="ts" setup>
// import {useUserStore} from "@/store/user"
// import {storeToRefs} from "pinia"
// const user = useUserStore()
// const { count,count2 } = storeToRefs(user)
// console.log(user,'user')
const changeTheme = (): void => {
	document.getElementsByTagName('html')[0].className = 'dark'
}
</script>

<template>
	<!-- <div @click="user.$reset()">{{user.count}}-----{{count}}</div>
	<div @click="user.increment()">{{count2}}</div> -->
	<div @click="changeTheme">测试2</div>
</template>
<style lang="scss" scoped>
.cc {
	color: red;
}
.aa {
	color: yellow;
}
</style>
