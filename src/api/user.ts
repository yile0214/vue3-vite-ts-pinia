import { resuest } from '@/utils/axios'

export function getList() {
	return resuest.instance({
		url: '/DeviceGroup/listWithDevice',
		method: 'get'
	})
}
