<template>
	<el-dialog
		:model-value="true"
		:title="props.action === 'add' ? '新增菜单' : action === 'edit' ? '编辑菜单' : '查看菜单'"
		width="1000px"
		:close-on-click-modal="false"
		custom-class="form-upload"
		@opened="openDialog"
		@close="closeDialog"
	>
		<el-form ref="formRef" class="form_block" :model="form" :rules="rules" label-width="100px">
			<el-row :gutter="20">
				<el-col :span="24">
					<el-form-item label="上级菜单" prop="parentId">
						<el-cascader
							v-model="form.parentId"
							:options="props.menuList"
							:show-all-levels="false"
							:props="{
								label: 'name',
								value: 'id',
								children: 'childs',
								checkStrictly: true,
								emitPath: false
							}"
							clearable
							filterable
						/>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row :gutter="20">
				<el-col :span="12">
					<el-form-item prop="path" label="路由">
						<el-input v-model="form.path" placeholder="请输入" />
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item prop="title" label="标题">
						<el-input v-model="form.title" placeholder="请输入" />
					</el-form-item>
				</el-col>
			</el-row>
			<el-row :gutter="20">
				<el-col :span="12">
					<el-form-item prop="name" label="name">
						<el-input v-model="form.name" placeholder="请输入" />
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item prop="redirect" label="重定向">
						<el-input v-model="form.redirect" placeholder="请输入" />
					</el-form-item>
				</el-col>
			</el-row>
			<el-row :gutter="20">
				<el-col :span="12">
					<el-form-item prop="component" label="组件">
						<el-input v-model="form.component" placeholder="请输入" />
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item prop="icon" label="icon">
						<el-input v-model="form.icon" placeholder="请输入" />
					</el-form-item>
				</el-col>
			</el-row>
			<el-row :gutter="20">
				<!-- <el-col :span="12">
					<el-form-item label="排序" prop="sortNo">
						<el-input-number v-model="form.sortNo" :min="0" :precision="0" controls-position="right" />
					</el-form-item>
				</el-col> -->
			</el-row>
			<el-row :gutter="20">
				<el-col :span="12">
					<el-form-item prop="hidden" label="hidden">
						<el-radio-group v-model="form.hidden">
							<el-radio-button :label="true">是</el-radio-button>
							<el-radio-button :label="false">否</el-radio-button>
						</el-radio-group>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item prop="alwaysShow" label="alwaysShow">
						<el-radio-group v-model="form.alwaysShow">
							<el-radio-button :label="true">是</el-radio-button>
							<el-radio-button :label="false">否</el-radio-button>
						</el-radio-group>
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
import { addUserMenu, editUserMenu } from '@/api/menu'
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
		required: false,
		default: () => 'add'
	},
	menuList: {
		type: Array,
		required: true,
		default: () => []
	},
	appId: {
		type: String,
		required: true,
		default: () => ''
	}
})
let renderLoading = {}
// 表单ref
const formRef = ref()
// 表单数据
let form = reactive({
	parentId: '',
	title: '',
	name: '', // 模块名称
	path: '',
	redirect: '',
	component: '',
	icon: '',
	hidden: false,
	alwaysShow: false,
	appId:'',
	id:''
})
// 表单规则
let rules = reactive({
	title: [
		{
			required: true,
			message: '请输入标题',
			trigger: 'blur'
		}
	],
	component: [
		{
			required: true,
			message: '请输入组件',
			trigger: 'blur'
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
			const params = {
				appId: props.appId,
				name: form.title,
				parentId: form.parentId,
				route: {
					path: form.path,
					redirect: form.redirect,
					name: form.name,
					component: form.component,
					hidden: form.hidden,
					alwaysShow: form.alwaysShow,
					meta: {
						title: form.title,
						icon: form.icon
					}
				},
				id: form.id
			}
			if (props.action === 'add') {
				addUserMenu(params)
					.then(() => {
						closeDialog()
						emit('fetchData')
						ElMessage.success('新增成功')
					})
					.catch(() => {
						ElMessage.error('新增失败')
					})
					.finally(() => {
						renderLoading.close()
					})
			} else {
				editUserMenu(params)
					.then(() => {
						closeDialog()
						emit('fetchData')
						ElMessage.success('编辑成功')
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
		const { meta, ...rest } = props.currentData.route
		const currentData = { ...meta, ...rest }
		console.log(currentData, 'currentData')
		Object.keys(form).forEach(key => {
			form[key] = currentData[key]
		})
		form.appId = props.currentData.appId
		form.parentId = props.currentData.parentId
		form.id = props.currentData.id
	}
}
</script>
