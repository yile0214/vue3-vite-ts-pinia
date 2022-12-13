<template>
	<div class="container">
		<!-- <el-form ref="formRef" :model="operationInfo" label-width="0px">
      <el-form-item
        label=""
        prop="applicationId"
        :rules="[{ required: true, message: '请选择应用', trigger: 'change' }]"
      >
        <el-select v-model="operationInfo.applicationId" filterable placeholder="请选择应用" @change="fetchData">
          <el-option v-for="item in info.applyOptionList" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
        <el-button type="primary" class="btn" @click="addAction(formRef)">新增</el-button>
      </el-form-item>
    </el-form> -->
		<div class="btn_grounp">
			<el-button type="primary" @click="handleAction('add')">新增</el-button>
		</div>
		<!-- 表格 -->
		<el-table :data="info.tableData" border style="width: 100%" default-expand-all>
			<el-table-column prop="user" label="用户名" align="center" />
			<el-table-column prop="name" label="用户名称" align="center" />
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
			@fetch-data="fetchData"
		/>
	</div>
</template>
<script setup lang="ts">
import { userList, deleteUser } from '@/api/user'
import DialogForm from './dialogForm.vue'
import { deepCopy } from '@/utils'
import { ElMessageBox, ElMessage } from 'element-plus'
import { ref, reactive } from 'vue'

const info = reactive({ tableData: [] })
const operationInfo = reactive({
	action: '',
	currentData: {},
	dialogVisible: false
})
// 表格数据
const fetchData = () => {
	userList()
		.then((res:any) => {
			info.tableData = res
		})
		.catch(() => {
			info.tableData = []
		})
}

// 操作
const handleAction = (action:string, row:any) => {
	operationInfo.action = action
	operationInfo.currentData = deepCopy(row)
	operationInfo.dialogVisible = true
}

// 删除
const handleDelete = (id:string) => {
	ElMessageBox.confirm('是否确认删除当前数据?', '删除提示', {
		confirmButtonText: '确认',
		cancelButtonText: '取消',
		type: 'warning'
	})
		.then(() => {
			deleteUser(id)
				.then(() => {
					fetchData()
					ElMessage.success('删除成功')
				})
				.catch(() => {
					ElMessage.error('删除失败')
				})
		})
		.catch(() => {})
}

fetchData()
</script>
