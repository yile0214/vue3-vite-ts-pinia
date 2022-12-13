let cookie = {
	getAll: function () {
		var arr = document.cookie.split('; ')
		var obj = {}
		for (var i = 0; i < arr.length; i++) {
			obj[arr[i].split('=')[0]] = arr[i].split('=')[1]
		}
		return obj
	},
	get: function (key) {
		return this.getAll()[key]
	},
	set: function (key, value, time) {
		// var date = new Date().getTime() + time * 3600000;
		var date = ''
		if (window.location.href.indexOf('grasstech') !== -1) {
			document.cookie = key + '=' + value + ';expires=' + new Date(date).toUTCString() + ';domain=.grasstech.cn;path=/'
		} else if (window.location.href.indexOf('jchc') !== -1) {
			document.cookie = key + '=' + value + ';expires=' + new Date(date).toUTCString()
		} else if (window.location.href.indexOf('localhost') !== -1) {
			document.cookie = key + '=' + value + ';expires=' + new Date(date).toUTCString()
		} else if (window.location.href.indexOf('192') !== -1 || window.location.href.indexOf('172')) {
			document.cookie = key + '=' + value + ';expires=' + new Date(date).toUTCString()
		} else {
			document.cookie = key + '=' + value + ';expires=' + new Date(date).toUTCString() + ';domain=.grasstech.cn;path=/'
		}
	},
	remove: function (key) {
		var date = new Date().getTime() - 1
		if (window.location.href.indexOf('grasstech') !== -1) {
			document.cookie = key + '=;expires=' + new Date(date).toUTCString() + ';domain=.grasstech.cn;path=/'
		} else if (window.location.href.indexOf('jchc') !== -1) {
			document.cookie = key + '=;expires=' + new Date(date).toUTCString()
		} else if (window.location.href.indexOf('localhost') !== -1) {
			document.cookie = key + '=;expires=' + new Date(date).toUTCString()
		} else if (window.location.href.indexOf('192') !== -1 || window.location.href.indexOf('172')) {
			document.cookie = key + '=;expires=' + new Date(date).toUTCString()
		} else {
			document.cookie = key + '=;expires=' + new Date(date).toUTCString() + ';domain=.grasstech.cn;path=/'
		}
	}
}
export default cookie
