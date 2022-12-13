<template>
	<el-dialog
		:model-value="true"
		:title="props.action === 'add' ? '新增功能' : action === 'edit' ? '编辑功能' : '查看功能'"
		width="1000px"
		:close-on-click-modal="false"
		custom-class="form-upload"
		@opened="openDialog"
		@close="closeDialog"
	>
		<el-form
			ref="formRef"
			class="form_block"
			:model="form"
			:rules="rules"
			label-width="100px"
			:disabled="props.action === 'look'"
		>
			<el-row :gutter="20">
				<el-col :span="12">
					<el-form-item prop="name" label="功能名称">
						<el-input v-model="form.name" placeholder="请输入" />
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item prop="powers" label="权限地址组">
						<el-input v-model="form.powers[0]" autocomplete="off" placeholder="请输入" />
						<el-input
							v-for="item in form.powers.length"
							:key="item"
							v-model="form.powers[item]"
							autocomplete="off"
							placeholder="请输入"
						/>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		<template #footer>
			<div v-if="action !== 'look'">
				<el-button @click="closeDialog">退出</el-button>
				<el-button type="primary" @click="saveForm(formRef)">提交</el-button>
			</div>
		</template>
	</el-dialog>
</template>
<script setup lang="ts">
import { addUserOperation, editUserOperation } from '@/api/operation'
import { ElMessage, ElLoading } from 'element-plus'
import { ref, reactive } from 'vue'
const emit = defineEmits(['update:dialogVisible', 'fetchData'])
const props = defineProps({
	dialogVisible: {
		type: Boolean,
		default: () => true
	},
	currentData: {
		type: Object,
		default: () => {}
	},
	action: {
		type: String,
		required: true,
		default: () => 'add'
	},
	menuId: {
		type: String,
		required: true,
		default: () => 'add'
	}
})
let renderLoading = {}
// 表单ref
const formRef = ref()
// 表单数据
let form = reactive({
	name: '',
	powers: [],
	menuId: props.menuId,
	id:''
})
// 表单规则
let rules = reactive({
	name: [
		{
			required: true,
			message: '请输入功能名称',
			trigger: 'blur'
		}
	],
	powers: [
		{
			required: true,
			message: '请输入权限地址',
			trigger: 'change'
		}
	]
})
// 打开弹框
const openDialog = () => {
	initForm()
}
// 关闭弹框
const closeDialog = () => {
	emit('update:dialogVisible', false)
}
// 保存
const saveForm = (formEl:any) => {
	if (!formEl) return
	formEl.validate((valid:boolean) => {
		if (valid) {
			renderLoading = ElLoading.service({
				target: '.form-upload',
				fullscreen: false,
				lock: true
			})
			if (props.action === 'add') {
				addUserOperation(form)
					.then(() => {
						ElMessage({
							type: 'success',
							message: '新增成功'
						})
						closeDialog()
						emit('fetchData')
					})
					.catch(() => {
						ElMessage({
							type: 'warning',
							message: '新增失败'
						})
					})
					.finally(() => {
						renderLoading.close()
					})
			} else {
				editUserOperation(form)
					.then(() => {
						ElMessage({
							type: 'success',
							message: '编辑成功'
						})
						closeDialog()
						emit('fetchData')
					})
					.catch(() => {
						ElMessage({
							type: 'warning',
							message: '编辑失败'
						})
					})
					.finally(() => {
						renderLoading.close()
					})
			}
		}
	})
}
// 初始化表单--编辑状态时
const initForm = () => {
	if (props.action !== 'add') {
		Object.keys(form).forEach(key => {
			form[key] = props.currentData[key]
		})
		form.id = props.currentData.id
	}
}
</script>
