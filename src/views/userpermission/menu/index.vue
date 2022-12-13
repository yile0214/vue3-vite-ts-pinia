<template>
	<div class="container">
		<el-card class="left_card">
			<el-form ref="formRef" :model="info" label-width="0px">
				<el-form-item label="" prop="appId" :rules="[{ required: true, message: '请选择应用', trigger: 'change' }]">
					<el-select v-model="info.appId" filterable placeholder="请选择应用" @change="searchTree">
						<el-option v-for="item in info.applyOptionList" :key="item.id" :label="item.name" :value="item.id" />
					</el-select>
					<el-button type="primary" class="btn" @click="menuHandleAction(formRef, 'add')">新增菜单</el-button>
				</el-form-item>
			</el-form>
			<!-- 树形图 -->
			<el-tree
				ref="functionTree"
				:data="info.leftTree"
				:props="{
					value: 'id', // ID字段名
					label: 'name',
					children: 'childs'
				}"
				:expand-on-click-node="true"
				:default-expand-all="true"
				@node-click="handleNodeClick"
			>
				<template #default="{ node, data }">
					<div class="custom-tree-node">
						<span>{{ node.label }}</span>
						<span class="text_btn">
							<el-button text type="primary" :icon="Edit" @click="menuHandleAction(formRef, 'edit', data)" />
							<el-button text type="danger" :icon="Delete" @click="handleDelete('left', data.id)" />
						</span>
					</div>
				</template>
			</el-tree>
		</el-card>
		<el-card class="right_card">
			<div class="title">{{ info.leftTreeNodeName }}</div>
			<div class="btn_grounp">
				<el-button v-if="info.leftTreeNodeId" type="primary" @click="functionHandleAction('add')">新增功能</el-button>
			</div>
			<!-- 表格 -->
			<el-table :data="info.rightTableData" border highlight-current-row>
				<el-table-column prop="name" label="功能名称" align="center" />
				<el-table-column prop="name" label="功能地址" align="center">
					<template #default="scope">
						<p v-for="(item, id) in scope.row.powers" :key="id">{{ item }}</p>
					</template>
				</el-table-column>
				<el-table-column label="操作" fixed="right" align="center" width="180">
					<template #default="scope">
						<el-button type="primary" text @click="functionHandleAction('edit', scope.row)">编辑</el-button>
						<el-button type="danger" text @click="handleDelete('right', scope.row.id)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-card>
		<!-- 菜单表单 -->
		<menu-handle
			v-if="operationInfo.menuVisible"
			v-model:dialog-visible="operationInfo.menuVisible"
			:current-data="operationInfo.currentData"
			:action="operationInfo.action"
			:menu-list="info.leftTree"
			:app-id="info.appId"
			@fetch-data="searchTree"
		/>
		<!-- 功能表单 -->
		<operation-handle
			v-if="operationInfo.functionVisible"
			v-model:dialog-visible="operationInfo.functionVisible"
			:current-data="operationInfo.currentData"
			:action="operationInfo.action"
			:menu-id="info.leftTreeNodeId"
			@fetch-data="getOperationList"
		/>
	</div>
</template>
<script setup lang="ts">
import { Edit, Delete } from '@element-plus/icons-vue'
import { appList } from '@/api/application'
import { userMenuTree, deleteUserMenu } from '@/api/menu'
import { listByMenu, deleteUserOperation } from '@/api/operation'
import { deepCopy } from '@/utils'
import MenuHandle from './menuHandle.vue'
import OperationHandle from './operationHandle.vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import { ref, reactive } from 'vue'
import {ObjTy} from "~/common"
const operationInfo = reactive({
	action: '',
	currentData: {},
	menuVisible: false,
	functionVisible: false
})
const info = reactive<ObjTy>({
	applyOptionList: [],
	appId: '',
	leftTreeNodeId: '',
	leftTreeNodeName: '',
	leftTree: [],
	rightTableData: []
})
const formRef = ref()
// 获取应用列表
const getApplicationList = () => {
	return new Promise<void>((resolve, reject) => {
		appList()
			.then((res:any) => {
				info.applyOptionList = res
				resolve()
			})
			.catch(() => {
				reject()
			})
	})
}
// 搜索左侧树桩列表
const searchTree = () => {
	userMenuTree(info.appId)
		.then((res:any) => {
			info.leftTree = res
		})
		.catch(() => {})
}

// 获取右侧列表
const getOperationList = () => {
	return new Promise<void>((resolve, reject) => {
		listByMenu({
			menuId: info.leftTreeNodeId
		})
			.then((res:any) => {
				info.rightTableData = res
				resolve()
			})
			.catch(() => {
				reject()
			})
	})
}

// 左侧树节点点击
const handleNodeClick = (data:any) => {
	info.leftTreeNodeId = data.id
	info.leftTreeNodeName = data.name
	getOperationList().catch(() => {})
}

// 菜单弹框操作
const menuHandleAction = (formEl:any, action:string, row?:any) => {
	if (!formEl) return
	formEl.validate((valid:boolean) => {
		if (valid) {
			operationInfo.action = action
			operationInfo.currentData = row ? deepCopy(row) : {}
			operationInfo.menuVisible = true
		}
	})
}

// 功能弹框操作
const functionHandleAction = (action:string, row:any) => {
	operationInfo.action = action
	operationInfo.currentData = row ? deepCopy(row) : {}
	operationInfo.functionVisible = true
}

// 删除
const handleDelete = (action:string, id:string) => {
	ElMessageBox.confirm('是否确认删除当前数据?', '删除提示', {
		confirmButtonText: '确认',
		cancelButtonText: '取消',
		type: 'warning'
	})
		.then(() => {
			if (action === 'left') {
				deleteUserMenu(id)
					.then(() => {
						searchTree()
						ElMessage({
							type: 'success',
							message: '删除成功'
						})
					})
					.catch(() => {
						ElMessage({
							type: 'info',
							message: '删除失败'
						})
					})
			} else {
				deleteUserOperation(id)
					.then(() => {
						getOperationList().catch(() => {})
						ElMessage({
							type: 'success',
							message: '删除成功'
						})
					})
					.catch(() => {
						ElMessage({
							type: 'info',
							message: '删除失败'
						})
					})
			}
		})
		.catch(() => {})
}

getApplicationList()
</script>
<style lang="scss" scoped>
.container {
	display: flex;
	justify-content: space-around;
	.left_card {
		width: 36%;
	}
	.right_card {
		width: 60%;
	}
}
.el-tree {
	margin-top: 20px;
	.custom-tree-node {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 14px;
		padding-right: 8px;
		.text_btn {
			display: none;
		}
		&:hover {
			.text_btn {
				display: block;
			}
		}
	}
}
.btn {
	margin-left: 10px;
}
.title {
	line-height: 50px;
	font-size: 18px;
	font-weight: 600;
	text-align: center;
}
</style>
