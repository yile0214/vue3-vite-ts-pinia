<template>
	<div class="container">
		<div class="btn_grounp">
			<el-button type="primary" @click="handleAction('add')">新增</el-button>
		</div>
		<!-- 表格 -->
		<el-table :data="tableData" border>
			<el-table-column prop="name" label="省份" align="center" />
			<el-table-column prop="code" label="编号" align="center" />
			<el-table-column prop="color" label="线路颜色" align="center" />
			<el-table-column prop="backgroundcolor" label="背景颜色" align="center" />
			<el-table-column label="操作" fixed="right" align="center" width="160">
				<template #default="scope">
					<el-button type="primary" text @click="handleAction('edit', scope.row)">编辑</el-button>
					<el-button type="danger" text @click="handleDelete(scope.row.id)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!-- 分页 -->
		<div class="pagination_block">
			<el-pagination
				v-model:currentPage="page"
				:page-size="20"
				background
				layout="total, prev, pager, next"
				:total="total"
				@current-change="handleCurrentChange"
			/>
		</div>
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
import { provincePageList, deleteProvince } from '@/api/province'
import DialogForm from './dialogForm.vue'
import { ref, reactive } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import paginationHook from '@/hooks/useTablePage'
const tableData = ref([])
const total = ref(0)
const operationInfo = reactive({ action: '', currentData: {}, dialogVisible: false })
// 查询
const fetchData = () => {
	return new Promise<void>((resolve, reject) => {
		provincePageList()
			.then((res: any) => {
				tableData.value = res.pageList
				total.value = res.total
				resolve()
			})
			.catch((err: any) => {
				console.log(err)
				reject()
			})
	})
}

// 分页hook
const { page, handleCurrentChange } = paginationHook(fetchData)

// 操作
const handleAction = (action: string, row: any = {}) => {
	operationInfo.action = action
	operationInfo.currentData = row ? { ...row } : {}
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
			deleteProvince(id)
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
		.catch(() => {
			console.log('取消删除')
		})
}

fetchData()
</script>
