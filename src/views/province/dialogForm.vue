<template>
	<el-dialog
		:model-value="true"
		:title="props.action === 'add' ? '新增' : action === 'edit' ? '编辑' : '查看'"
		width="1000px"
		:close-on-click-modal="false"
		custom-class="form-upload"
		@opened="openDialog"
		@close="closeDialog"
	>
		<el-form ref="formRef" class="form_block" :model="form" :rules="rules" label-width="80px">
			<el-row :gutter="20">
				<el-col :span="12">
					<el-form-item prop="name" label="省份">
						<el-input v-model="form.name" placeholder="请输入" clearable />
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item prop="code" label="编号">
						<el-input v-model="form.code" placeholder="请输入" clearable />
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item prop="color" label="线路颜色">
						<el-color-picker v-model="form.color" />
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item prop="backgroundcolor" label="背景颜色">
						<el-color-picker v-model="form.backgroundcolor" />
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
<script lang="ts" setup>
import { addProvince, editProvince } from '@/api/province'
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
		default: () => ({})
	},
	action: {
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
	code: '',
	backgroundcolor: '',
	color: '',
	id: ''
})
// 表单规则
let rules = reactive({
	name: [{ required: true, message: '请输入省份', trigger: 'blur' }],
	code: [{ required: true, message: '请输入编号', trigger: 'blur' }],
	backgroundcolor: [{ required: true, message: '请选择背景颜色', trigger: 'change' }],
	color: [{ required: true, message: '请选择线路颜色', trigger: 'change' }]
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
const saveForm = (formEl: any) => {
	if (!formEl) return
	formEl.validate((valid: boolean) => {
		if (valid) {
			renderLoading = ElLoading.service({
				target: '.form-upload',
				fullscreen: false,
				lock: true
			})
			if (props.action === 'add') {
				addProvince(form)
					.then(() => {
						ElMessage.success('新增成功')
						closeDialog()
						emit('fetchData')
					})
					.catch(() => {
						ElMessage.error('新增失败')
					})
					.finally(() => {
						renderLoading.close()
					})
			} else {
				editProvince(form)
					.then(() => {
						ElMessage.success('编辑成功')
						closeDialog()
						emit('fetchData')
					})
					.catch(() => {
						ElMessage.error('编辑失败')
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
