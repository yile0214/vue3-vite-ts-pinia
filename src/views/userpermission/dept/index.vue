<template>
	<div class="container">
		<!-- <div class="btn_grounp">
			<el-button type="primary" @click="handleAction('add')">新增</el-button>
		</div> -->
		<el-form ref="formRef" :model="operationInfo" label-width="0px">
			<el-form-item label="" prop="appId" :rules="[{ required: true, message: '请选择应用', trigger: 'change' }]">
				<el-select v-model="operationInfo.appId" filterable placeholder="请选择应用" @change="fetchData">
					<el-option v-for="item in info.appList" :key="item.id" :label="item.name" :value="item.id" />
				</el-select>
				<el-button type="primary" style="margin-left: 5px;" @click="addAction(formRef)">新增</el-button>
			</el-form-item>
		</el-form>
		<el-table
			ref="singleTable"
			row-key="id"
			:data="info.tableData"
			border
			highlight-current-row
			default-expand-all
			:tree-props="{ children: 'childs' }"
		>
			<el-table-column prop="name" label="部门名称" align="left" />
			<el-table-column label="操作" align="center" width="160">
				<template #default="scope">
					<el-button type="primary" text @click="handleAction('edit', scope.row)"> 编辑 </el-button>
					<el-button type="danger" text @click="handleDelete(scope.row.id)"> 删除 </el-button>
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
import { userDeptTree, deleteUserDept } from '@/api/dept'
import DialogForm from './dialogForm.vue'
import { ref, reactive } from 'vue'
import { appList } from '@/api/application'
import { ElMessageBox, ElMessage } from 'element-plus'
import {ObjTy} from "~/common"
const info = reactive<ObjTy>({ appList: [], tableData: [] })
const operationInfo = reactive({ action: '', currentData: {}, dialogVisible: false, appId: '' })
const formRef = ref()
// 查询
const fetchData = () => {
	return new Promise<void>((resolve, reject) => {
		userDeptTree(operationInfo.appId)
			.then((res: any) => {
				info.tableData = res
				resolve()
			})
			.catch((err: any) => {
				console.log(err)
				reject()
			})
	})
}

// 查询应用
const getAapplication = () => {
	appList()
		.then((res: any) => {
			info.appList = res
		})
		.catch((err: any) => {
			console.log(err)
		})
}

// 操作
const handleAction = (action: string, row: any = {}) => {
	operationInfo.action = action
	operationInfo.currentData = row ? { ...row } : {}
	operationInfo.dialogVisible = true
}

// 新增操作
const addAction = (formEl:any) => {
	if (!formEl) return
	formEl.validate((valid:boolean) => {
		if (valid) {
			operationInfo.action = 'add'
			operationInfo.currentData = {}
			operationInfo.dialogVisible = true
		}
	})
}

// 删除
const handleDelete = (id: string) => {
	ElMessageBox.confirm('是否确认删除当前数据?', '删除提示', {
		confirmButtonText: '确认',
		cancelButtonText: '取消',
		type: 'warning'
	})
		.then(() => {
			deleteUserDept(id)
				.then(() => {
					fetchData()
					ElMessage({
						type: 'success',
						message: '删除成功'
					})
				})
				.catch(() => {
					ElMessage({
						type: 'warning',
						message: '删除失败'
					})
				})
		})
		.catch(() => {})
}

getAapplication()
</script>
