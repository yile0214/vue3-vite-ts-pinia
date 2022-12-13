import Request from '@/utils/axios'
import { getToken } from '@/utils/auth'
const service = config => {
	if (config.method === 'get') {
		if (!config.params) {
			config.params = { userToken: getToken() }
		} else {
			config.params.userToken = getToken()
		}
	} else {
		if (!config.data) {
			config.data = { userToken: getToken() }
		} else {
			config.data.userToken = getToken()
		}
	}
	config.url = import.meta.env.VITE_APP_BASE_URL + config.url
	return new Request().instance(config)
}

export default service
