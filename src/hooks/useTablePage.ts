import { ref, onMounted } from 'vue'
export default function (selectPageReq: any) {
	/*分页*/
	const page = ref(1)
	const pageSize = ref(20)
	const handleCurrentChange = (val: number) => {
		page.value = val
		selectPageReq()
	}
	const handleSizeChange = (val: number) => {
		pageSize.value = val
		selectPageReq()
	}
	onMounted(() => {})
	return {
		page,
		pageSize,
		handleCurrentChange,
		handleSizeChange
	}
}
