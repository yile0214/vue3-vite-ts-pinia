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
				<el-col :span="24">
					<el-form-item prop="provinceId" label="省份">
						<el-select v-model="form.provinceId" filterable placeholder="省份">
							<el-option v-for="item in props.provinceList" :key="item.id" :label="item.name" :value="item.id" />
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="24">
					<el-form-item prop="name" label="名称">
						<el-input v-model="form.name" placeholder="请输入" clearable />
					</el-form-item>
				</el-col>
				<el-col :span="24">
					<el-form-item prop="shortname" label="简称">
						<el-input v-model="form.shortname" placeholder="请输入" clearable />
					</el-form-item>
				</el-col>
				<!-- <el-col :span="12">
					<el-form-item prop="sn" label="关联路段">
						<el-input v-model="form.sn" placeholder="请输入" clearable />
					</el-form-item>
				</el-col> -->
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
import { addCompany, editCompany } from '@/api/company'
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
	provinceList: {
		type: Object,
		default: () => []
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
	provinceId: '',
	name: '',
	shortname: '',
	id: ''
})
// 表单规则
let rules = reactive({
	provinceId: [{ required: true, message: '请选择省份', trigger: 'change' }],
	name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
	shortname: [{ required: true, message: '请输入简称', trigger: 'blur' }]
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
				addCompany(form)
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
				editCompany(form)
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
