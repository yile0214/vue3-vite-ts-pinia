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
		<el-form ref="formRef" class="form_block" :model="form" :rules="rules" label-width="110px">
			<el-row :gutter="20">
				<el-col :span="12">
					<el-form-item prop="name" label="角色名称">
						<el-input v-model="form.name" />
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item prop="deptId" label="部门">
						<el-select v-model="form.deptId" placeholder="请选择">
							<el-option v-for="item in info.departList" :key="item.id" :label="item.name" :value="item.id" />
						</el-select>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row :gutter="20">
				<el-col :span="12">
					<el-form-item prop="fetchChild" label="是否包含子部门">
						<el-switch v-model="form.fetchChild" />
					</el-form-item>
				</el-col>
			</el-row>
			<el-row :gutter="20">
				<el-col :span="8">
					<el-tree
						ref="tree"
						:data="info.functionTreeList"
						:props="{
							label: 'name',
							children: 'childs',
							value: 'id',
							disabled: 'disabled'
						}"
						node-key="id"
						default-expand-all
						show-checkbox
						highlight-current
						:check-on-click-node="false"
						check-strictly
						:default-checked-keys="info.currentMenuIds"
						@node-click="handleNodeClick"
						@check-change="checkChange"
						@check="handleCheckNode"
					>
						<template #default="{ data }">
							<div>
								{{ data.name }}
							</div>
						</template>
					</el-tree>
				</el-col>
				<el-col :span="16">
					<el-table
						ref="tableRef"
						:data="info.optionDatas"
						border
						:row-key="getRowKeys"
						@selection-change="handleSelectionChange"
					>
						<el-table-column
							type="selection"
							size="medium"
							:reserve-selection="true"
							header-align="center"
							align="center"
							width="50"
						/>
						<el-table-column prop="name" label="角色名称" show-overflow-tooltip align="center" />
						<el-table-column label="功能地址" align="center">
							<template #default="scope">
								<p v-for="(item, id) in scope.row.apis" :key="id">{{ item }}</p>
							</template>
						</el-table-column>
					</el-table>
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
import { addRole, editRole } from '@/api/roles'
import { userDeptTree } from '@/api/dept'
import { userMenuTree } from '@/api/menu'
import { listByMenu } from '@/api/operation'
import { ElMessage, ElLoading } from 'element-plus'
import { ref, reactive, nextTick } from 'vue'
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
	},
	appId: {
		type: String,
		required: true,
		default: () => ''
	}
})
let renderLoading = {}
const info = reactive({
	departList: [], // 部门
	functionTreeList: [], //菜单
	optionDatas: [], // 功能
	currentMenuIds: [], // 修改的时候反选回来
	idKey: 'id', // 标识列表数据中每一行的唯一键的名称(需要按自己的数据改一下)
	multipleSelection: [],
	multipleSelectionAll: [] // 所有选中的数据包含跨页数据
})
// 表格Ref
const tableRef = ref()
// 表单ref
const formRef = ref()
// 表单数据
let form = reactive({
	name: '',
	deptId: '',
	fetchChild: false,
	id:''
})
// 表单规则
let rules = reactive({
	name: [
		{
			required: true,
			message: '请输入角色名称',
			trigger: 'blur'
		}
	],
	deptId: [
		{
			required: true,
			message: '请选择部门',
			trigger: 'change'
		}
	]
})
// 获取功能
const getFunctionList = () => {
	return new Promise<void>((resolve, reject) => {
		userMenuTree(props.appId)
			.then((res:any) => {
				info.functionTreeList = res
				resolve()
			})
			.catch(() => {
				reject()
			})
	})
}
// 获取应用对应部门
const getDepartList = () => {
	return new Promise<void>((resolve, reject) => {
		userDeptTree(props.appId)
			.then((res:any) => {
				info.departList = res
				resolve()
			})
			.catch(() => {
				reject()
			})
	})
}

// 获取功能对应的操作列表
const getOptionList = (id:string) => {
	listByMenu({
		menuId: id
	})
		.then((res:any) => {
			info.optionDatas = res
			nextTick(() => {
				setSelectRow()
			})
		})
		.catch(() => {
			info.optionDatas = []
		})
}

// 初始化表单--编辑状态时
const initForm = () => {
	if (props.action !== 'add') {
		Object.keys(form).forEach(key => {
			form[key] = props.currentData[key]
		})
		form.id = props.currentData.id
		info.currentMenuIds = props.currentData.menuIds || []
		info.multipleSelectionAll = props.currentData.operationIds || []
		console.log(info, 'info')
		// 功能操作的返回的数据
		if (info.currentMenuIds[0]) {
			getOptionList(info.currentMenuIds[0])
		}
	}
}

// 打开弹框
const openDialog = () => {
	renderLoading = ElLoading.service({
		target: '.form-upload',
		fullscreen: false,
		lock: true
	})
	Promise.all([getFunctionList(), getDepartList()])
		.catch(() => {})
		.finally(() => {
			renderLoading.close()
			initForm()
		})
}
// 关闭弹框
const closeDialog = () => {
	emit('update:dialogVisible', false)
}
// 保存
const saveForm = (formEl:any) => {
	if (!formEl) return
	formEl.validate((valid:boolean) => {
		// 执行以下记忆选择法  使最后一次勾选数据记忆下来
		changePageCoreRecordData()
		const operationIds = Array.from(new Set(info.multipleSelectionAll))
		// return
		if (valid) {
			renderLoading = ElLoading.service({
				target: '.form-upload',
				fullscreen: false,
				lock: true
			})
			const params = {
				appId: props.appId,
				menuIds: info.currentMenuIds,
				operationIds,
				...form
			}
			if (props.action === 'add') {
				addRole(params)
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
				editRole(params)
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

// ===================  组件事件   ===================
// row-key
const getRowKeys = (row:any) => {
	return row[info.idKey]
}
// 当复选框被点击时触发
const handleCheckNode = (e:Event, node:any) => {
	info.currentMenuIds = node.checkedKeys
}
// 是不是选中节点
const handleNodeClick = (data:any) => {
	if (data.id) {
		changePageCoreRecordData()
		getOptionList(data.id)
	}
}
// 树的复选框是否选中
const checkChange = (data:any, isCheck:boolean) => {
	if (isCheck) {
		changePageCoreRecordData()
		getOptionList(data.id)
	}
}
// 表格的方法
const handleSelectionChange = (val:any) => {
	info.multipleSelection = val
}
// 设置选中的方法
const setSelectRow = () => {
	if (!info.multipleSelectionAll || info.multipleSelectionAll.length <= 0) {
		return
	}
	// 标识当前行的唯一键的名称
	const idKey = info.idKey
	const selectAllIds:Array<string> = []
	info.multipleSelectionAll.forEach((id:string) => {
		selectAllIds.push(id)
	})
	tableRef.value.clearSelection()
	for (let i = 0; i < info.optionDatas.length; i++) {
		if (selectAllIds.indexOf(info.optionDatas[i][idKey]) >= 0) {
			// 设置选中，记住table组件需要使用ref="tableRef"
			tableRef.value.toggleRowSelection(info.optionDatas[i], true)
		}
	}
}
// 记忆选择核心方法
const changePageCoreRecordData = () => {
	// 标识当前行的唯一键的名称
	const idKey = info.idKey
	// 如果总记忆中还没有选择的数据，那么就直接取当前页选中的数据，不需要后面一系列计算
	if (info.multipleSelectionAll.length <= 0) {
		info.multipleSelectionAll = info.multipleSelection.map((item:any) => item[info.idKey])
		return
	}
	// 总选择里面的key集合
	const selectAllIds:string[] = []
	info.multipleSelectionAll.forEach((id:string) => {
		selectAllIds.push(id)
	})
	const selectIds:string[] = []
	// 获取当前页选中的id
	info.multipleSelection.forEach((row:any) => {
		selectIds.push(row[idKey])
		// 如果总选择里面不包含当前页选中的数据，那么就加入到总选择集合里
		if (selectAllIds.indexOf(row[idKey]) < 0) {
			info.multipleSelectionAll.push(row[info.idKey])
		}
	})
	const noSelectIds:string[] = []
	// 得到当前页没有选中的id
	info.optionDatas.forEach((row:any) => {
		if (selectIds.indexOf(row[idKey]) < 0) {
			noSelectIds.push(row[idKey])
		}
	})
	noSelectIds.forEach(id => {
		if (selectAllIds.indexOf(id) >= 0) {
			for (let i = 0; i < info.multipleSelectionAll.length; i++) {
				if (info.multipleSelectionAll[i] == id) {
					// 如果总选择中有未被选中的，那么就删除这条
					info.multipleSelectionAll.splice(i, 1)
					break
				}
			}
		}
	})
}
</script>
<style lang="scss" scoped>
.el-tree {
	height: 100%;
	border-right: 1px solid rgb(215, 213, 213, 0.9);
}
</style>
