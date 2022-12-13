<template>
	<div class="container">
		<el-form ref="formRef" :model="operationInfo" label-width="0px">
			<el-form-item label="" prop="appId" :rules="[{ required: true, message: '请选择应用', trigger: 'change' }]">
				<el-select v-model="operationInfo.appId" filterable placeholder="请选择应用" @change="fetchData">
					<el-option v-for="item in info.appList" :key="item.id" :label="item.name" :value="item.id" />
				</el-select>
				<el-button type="primary" class="btn" @click="addAction(formRef)">新增</el-button>
			</el-form-item>
		</el-form>
		<!-- 表格 -->
		<el-table :data="info.tableData" border highlight-current-row style="width: 100%" default-expand-all>
			<el-table-column prop="name" label="角色名称" align="center" />
			<el-table-column prop="fetchChild" label="是否包含子部门" align="center">
				<template #default="scope">
					{{ scope.row.fetchChild ? '是' : '否' }}
				</template>
			</el-table-column>
			<el-table-column prop="createTime" label="创建时间" align="center" />
			<el-table-column label="操作" fixed="right" align="center" width="320">
				<template #default="scope">
					<el-button type="primary" text @click="handleAction('edit', scope.row)">编辑</el-button>
					<el-button type="danger" text @click="handleDelete(scope.row.id)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!-- 表单 -->
		<dialog-form
			v-if="operationInfo.dialogVisible"
			v-model:dialog-visible="operationInfo.dialogVisible"
			:current-data="operationInfo.currentData"
			:action="operationInfo.action"
			:app-id="operationInfo.appId"
			@fetch-data="fetchData"
		/>
	</div>
</template>
<script setup lang="ts">
import { roleList, deleteUserRole } from '@/api/roles'
import { appList } from '@/api/application'
import DialogForm from './dialogForm.vue'
import { deepCopy } from '@/utils'
import { ElMessageBox, ElMessage } from 'element-plus'
import { ref, reactive } from 'vue'
// import type { FormInstance } from 'element-plus'
import { ObjTy } from '~/common'
const info = reactive<ObjTy>({ appList: [], tableData: [] })
const operationInfo = reactive({
	action: '',
	currentData: {},
	dialogVisible: false,
	appId: ''
})
const formRef = ref()
// 查询应用
const getAapplication = () => {
	appList()
		.then((res: any) => {
			info.appList = res
		})
		.catch((err: Error) => {
			console.log(err)
		})
}
// 表格数据
const fetchData = () => {
	roleList(operationInfo.appId)
		.then((res: any) => {
			info.tableData = res
		})
		.catch((err: Error) => {
			info.tableData = []
			console.log(err)
		})
}
// 新增操作
const addAction = (formEl: any) => {
	if (!formEl) return
	formEl.validate((valid: boolean) => {
		if (valid) {
			operationInfo.action = 'add'
			operationInfo.currentData = {}
			operationInfo.dialogVisible = true
		}
	})
}

// 操作
const handleAction = (action: string, row: any) => {
	operationInfo.action = action
	operationInfo.currentData = deepCopy(row)
	operationInfo.dialogVisible = true
}

// 删除
const handleDelete = (id: string) => {
	ElMessageBox.confirm('是否确认删除当前数据?', '删除提示', {
		confirmButtonText: '确认',
		cancelButtonText: '取消',
		type: 'warning'
	})
		.then(() => {
			deleteUserRole(id)
				.then(() => {
					fetchData()
					ElMessage.success('删除成功')
				})
				.catch(() => {
					ElMessage.error('删除失败')
				})
		})
		.catch(() => {
			console.log('取消')
		})
}

getAapplication()
</script>
<style lang="scss" scoped>
.btn {
	margin-left: 10px;
}
</style>
