<template>
	<div class="container">
		<div class="btn_grounp">
			<el-form ref="formRef" class="form_block" :model="form" label-width="0px">
				<el-row :gutter="20">
					<el-col :span="4">
						<el-form-item label="" prop="provinceId">
							<el-select v-model="form.provinceId" filterable placeholder="省份" @change="fetchData">
								<el-option v-for="item in operationInfo.provinceList" :key="item.id" :label="item.name" :value="item.id" />
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="4">
						<el-button type="primary" @click="handleAction('add')">新增</el-button>
					</el-col>
				</el-row>
			</el-form>
		</div>
		<!-- 表格 -->
		<el-table :data="tableData" border>
			<el-table-column prop="name" label="名称" align="center" />
			<el-table-column prop="shortname" label="简称" align="center" />
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
			:province-list="operationInfo.provinceList"
			@fetch-data="fetchData"
		/>
	</div>
</template>
<script setup lang="ts">
import { companyPageList, deleteCompany } from '@/api/company'
import { provinceList } from '@/api/province'
import DialogForm from './dialogForm.vue'
import { ref, reactive } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import { ObjTy } from '~/common'
import paginationHook from '@/hooks/useTablePage'
const tableData = ref([])
const total = ref(0)
const form = reactive({ provinceId: '' })
const operationInfo = reactive<ObjTy>({ action: '', currentData: {}, dialogVisible: false, provinceList: [] })
// 查询
const fetchData = () => {
	return new Promise<void>((resolve, reject) => {
		companyPageList({ ...form, page: page.value })
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

// 获取省份
const fetchProvince = () => {
	return new Promise<void>((resolve, reject) => {
		provinceList()
			.then((res: any) => {
				operationInfo.provinceList = res
				resolve()
			})
			.catch((err: any) => {
				console.log(err)
				reject()
			})
	})
}

// 操作
const handleAction = (action: string, row?: any) => {
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
			deleteCompany(id)
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
fetchProvince()
</script>
