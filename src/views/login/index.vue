<template>
	<div class="login_contain">
		<el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm" status-icon>
			<el-form-item label="用户名" prop="user">
				<el-input v-model="ruleForm.user" />
			</el-form-item>
			<el-form-item label="密码" prop="password">
				<el-input v-model="ruleForm.password" />
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitForm(ruleFormRef)">登录</el-button>
				<!-- <el-button @click="resetForm(ruleFormRef)">Reset</el-button> -->
			</el-form-item>
		</el-form>
	</div>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/user'
import { ElMessage } from 'element-plus'
import md5 from 'blueimp-md5'
const ruleFormRef = ref()
const ruleForm = reactive({
	user: 'admin',
	password: 'admin123'
})

const rules = reactive({
	// name: [
	// 	{ required: true, message: 'Please input 用户名', trigger: 'blur' },
	// 	{ min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' }
	// ],
	// region: [
	// 	{
	// 		required: true,
	// 		message: 'Please select Activity zone',
	// 		trigger: 'change'
	// 	}
	// ]
})
let loading = ref(false)
const router = useRouter()
let loginReq = () => {
	loading.value = true
	const userStore = useUserStore()
	userStore
		.login(ruleForm.user, md5(ruleForm.password))
		.then(() => {
			ElMessage({ message: '登录成功', type: 'success' })
			router.push({ path: '/' })
		})
		.catch(() => {
			console.log(1111)
			loading.value = false
		})
}

const submitForm = async (formEl:any) => {
	if (!formEl) return
	await formEl.validate((valid: boolean) => {
		if (valid) {
			loginReq()
		} else {
			return false
		}
	})
}
</script>
