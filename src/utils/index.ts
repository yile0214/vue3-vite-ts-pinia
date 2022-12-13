// 深拷贝
export function deepCopy(obj) {
	let result
	const type = checkType(obj)
	if (type === 'array' || type === 'object') {
		result = type === 'array' ? [] : {}
		Object.keys(obj).forEach(index => {
			if (typeof obj[index] === 'object' && obj[index] !== null) {
				result[index] = deepCopy(obj[index])
			} else {
				result[index] = obj[index]
			}
		})
	} else {
		result = obj
	}
	return result
}

// 数据类型
export function checkType(obj) {
	return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase()
}
