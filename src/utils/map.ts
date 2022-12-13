// import * as d3 from 'd3'
import { ObjTy } from '~/common'
import { ref, reactive, Ref } from 'vue'
import { useMapStore } from '@/store/map'
import { ElMessage } from 'element-plus'

const mapStore = useMapStore()
const timer = ref<any>(null) // 此参数主要为了区分单击和双击事件
// 阻止冒泡事件等
const stopPropagationEvent = () => {
	let event = d3.event
	event.stopPropagation() //阻止事件冒泡
	event.preventDefault() //阻止默认行为
}
//绘制线
export function svgLines(list: any) {
	const g = d3.select('#gwrap')
	//开始画线
	g.selectAll('g')
		.data(list)
		.join('g')
		.attr('class', 'linesg')
		.attr('cursor', 'pointer')
		.selectAll('path')
		.data(function (d: any) {
			return d
		})
		.join('path')
		.attr('id', function (d: any) {
			return 'line' + d.id
		})
		.attr('class', 'lineitem')
		.attr('stroke', function (d: any) {
			return d.color
		})
		.attr('color', function (d: any) {
			return d.color
		})
		.attr('stroke-width', function () {
			return 1
		})
		.attr('d', function (d: any) {
			return d.linepath
		})
		.attr('transform', function (d: any) {
			if (d.flag) {
				return 'translate(0 0.6)'
			} else {
				return 'translate(0 -0.6) '
			}
		})
	d3.selectAll('.linesg')
		.data(list)
		.attr('transform', function (d: any) {
			const tx = d[0].startLonLat[0]
			const ty = d[0].startLonLat[1]
			const angel = d[0].angel
			const str = 'translate(' + tx + ' ' + ty + ') rotate(' + angel + ' ' + 0 + ' ' + 0 + ')'
			return str
		})
}

//绘制门架
export function svgGantry(list: any) {
	const g = d3.select('#gwrap')
	g.selectAll('.gantry')
		.data(list)
		.join('image')
		.attr('class', 'gantry')
		.attr('id', function (d: any) {
			return 'gantry' + d.id
		})
		.attr('cursor', 'pointer')
		.attr('x', function (d: any) {
			return d.coordinates[0] - 0.7
		})
		.attr('y', function (d: any) {
			return d.coordinates[1] - 0.7
		})
		.attr('width', 1.4)
		.attr('height', 1.4)
		.attr('xlink:href', 'https://upload-grasstech.oss-cn-shanghai.aliyuncs.com/route/gantry.png')
}

//绘制节点
export function svgNodePoints(list: any) {
	const g = d3.select('#gwrap')
	g.selectAll('.point').remove()
	g.selectAll('.rectpoint').remove()
	const circlePoints: any = []
	const rectPoints: any = []
	list.forEach((item: any) => {
		if (item.type === '标识站') {
			rectPoints.push(item)
		} else {
			circlePoints.push(item)
		}
	})
	// 画圆形节点
	g.selectAll('.circlepoint')
		.data(circlePoints)
		.join('circle')
		.attr('class', function (d) {
			if (d.type === '收费站') {
				return 'point poEve poClick '
			} else {
				return 'point poEve lineaddclick'
			}
		})
		.attr('cursor', 'pointer')
		.attr('cx', function (d) {
			return d.coordinates[0]
		})
		.attr('cy', function (d) {
			return d.coordinates[1]
		})
		.attr('fill', function (d) {
			if (d.border) {
				return '#fff'
			} else {
				return d.style.backgroundcolor
			}
		})
		.attr('r', function (d) {
			return d.style.size
		})
		.attr('stroke-width', function (d) {
			return d.style.bordersize
		})
		.attr('stroke', function (d) {
			return d.style.bordercolor
		})
	// 画标识站
	g.selectAll('rect')
		.data(rectPoints)
		.join('rect')
		.attr('class', 'rectpoint poEve')
		.attr('cursor', 'pointer')
		.attr('x', function (d) {
			return d.coordinates[0]
		})
		.attr('y', function (d) {
			return d.coordinates[1]
		})
		.attr('fill', function (d) {
			return d.style.backgroundcolor
		})
		.attr('width', function (d) {
			return d.style.size
		})
		.attr('height', function (d) {
			return d.style.size
		})
		.attr('stroke-width', function (d) {
			return d.style.bordersize
		})
		.attr('stroke', function (d) {
			return d.style.bordercolor
		})
		.attr('transform', function () {
			return 'translate(-2.5 -2.5)'
		})
}

//绘制字
export function svgTxt(points: any, lines: any) {
	const g = d3.select('#gwrap')
	g.selectAll('.poTxt')
		.data(points)
		.join('text')
		.attr('class', function (d) {
			if (d.type === '收费站') {
				return 'text_name poTxt poEve poClick'
			} else {
				return 'text_name poTxt poEve'
			}
		})
		.attr('cursor', 'pointer')
		.text(function (d) {
			return d.name
		})
		.attr('x', function (d) {
			return d.coordinates[0]
		})
		.attr('y', function (d) {
			return d.coordinates[1]
		})
		.attr('fill', function (d) {
			return d.style.fontcolor
		})
		.attr('font-size', function (d) {
			return d.style.fontsize
		})
		.attr('style', 'display:none')
		.attr('transform', function (d) {
			return 'translate(' + -d.name.length / 2 + ' 0.5)'
		})
	g.selectAll('.lineTxts')
		.data(lines)
		.join('text')
		.attr('class', 'text_name lineTxts')
		.attr('cursor', 'pointer')
		.text(function (d) {
			if (d.length === 1) {
				return d[0].distance
			} else {
				if (d[0].distance === d[1].distance) {
					return d[0].distance
				} else {
					return d[0].distance + '/' + d[1].distance
				}
			}
		})
		.attr('x', function (d) {
			let tx = (d[0].startLonLat[0] + d[0].endLonLat[0]) / 2
			return tx
		})
		.attr('y', function (d) {
			let ty = (d[0].startLonLat[1] + d[0].endLonLat[1]) / 2
			return ty
		})
		.attr('transform', function (d) {
			if (d.length === 1) {
				let angel = Math.abs(d[0].angel) > 180 ? Math.abs(d[0].angel) - 180 : Math.abs(d[0].angel)
				if (d[0].startLonLat[0] > d[0].endLonLat[0]) {
					if (angel > 45 && angel < 135) {
						return 'translate(-5 0)'
					} else {
						return 'translate(0 -1)'
					}
				} else if (d[0].startLonLat[0] === d[0].endLonLat[0]) {
					if (d[0].startLonLat[1] > d[0].endLonLat[1]) {
						return 'translate(-5 0)'
					} else {
						return 'translate(0 0)'
					}
				} else {
					if (angel > 45 && angel < 135) {
						return 'translate(0 0)'
					} else {
						return 'translate(0 3)'
					}
				}
			} else {
				return 'translate(0 0)'
			}
		})
		.attr('fill', '#fff')
		.attr('font-size', '1')
		.attr('style', 'display:none')
}

// 绘制通用样式
export function svgPolygon(radius: number) {
	const g = d3.select('#gwrap')
	// 起点
	g.append('g')
		.attr('id', 'start')
		.attr('style', 'display:none')
		.attr('cursor', 'pointer')
		.append('circle')
		.attr('id', 'startpoint')
		.attr('r', radius)
		.attr('fill', 'red')
		.attr('stroke-width', 0.3)
		.attr('stroke', 'red')
	d3.select('#start')
		.append('text')
		.attr('fill', 'white')
		.attr('font-size', radius + 'px')
		.attr('transform', 'translate(' + -radius / 2 + ' ' + radius / 2 + ')')
		.text('入')
	// 终点
	g.append('g')
		.attr('id', 'end')
		.attr('style', 'display:none')
		.attr('cursor', 'pointer')
		.append('circle')
		.attr('id', 'endpoint')
		.attr('r', radius)
		.attr('fill', '#edbb07')
		.attr('stroke-width', 0.3)
		.attr('stroke', 'red')
	d3.select('#end')
		.append('text')
		.attr('fill', 'white')
		.attr('font-size', radius + 'px')
		.attr('transform', 'translate(' + -radius / 2 + ' ' + radius / 2 + ')')
		.text('出')
	//信息框
	g.append('g')
		.attr('id', 'svginfo')
		.attr('style', 'display:none')
		.append('polygon')
		.attr('points', '0.5 0.5 0.5 91.5 48.5 91.5 3.5 129.5 113.5 93.5 291.5 93.5 291.5 0.5 0.5 0.5')
		.attr('fill', '#efefef')
		.attr('stroke', '#111')
		.attr('stroke-miterlimit', 10)
	const textLine1 = d3.select('#svginfo').append('text').attr('transform', 'translate(10 35)')
	textLine1.append('tspan').attr('id', 'text1').attr('font-size', 14)
	textLine1.append('tspan').attr('id', 'text2').attr('dx', '10').attr('font-size', 14)
	textLine1.append('tspan').attr('id', 'text3').attr('dx', '10').attr('font-size', 14)
	const textLine2 = d3.select('#svginfo').append('text').attr('transform', 'translate(10 65)')
	textLine2.append('tspan').attr('id', 'text4').attr('font-size', 14)
	textLine2.append('tspan').attr('id', 'text5').attr('dx', '10').attr('font-size', 12)
}

// 给点添加事件
export function addPointEvent(callback: (arg: any) => void, resetClearPath: () => void, infoZoom: Ref<number>) {
	const activePoint = reactive<ObjTy>({
		startActive: false,
		endActive: false,
		nodes: []
	})
	// 清除激活数据
	const clearActivePoint = () => {
		activePoint.startActive = false
		activePoint.endActive = false
		activePoint.nodes = []
		d3.select('#start').attr('style', 'display:none')
		d3.select('#end').attr('style', 'display:none')
	}
	// 出入点公共点击方法
	const commonClick = (d: any) => {
		// console.log(d, 'commonClick')
		// 当"出"显示时,再点击则清空出入点和路线
		if (activePoint.endActive) resetClearPath()
		if (!activePoint.startActive) {
			activePoint.startActive = true
			activePoint.nodes.push({ id: d.id, type: d.type })
			d3.select('#start')
				.attr('style', '')
				.attr('transform', 'translate(' + d.coordinates[0] + ',' + d.coordinates[1] + ')')
			// “入”点为门架时且当前操作"添加路线"未被激活时
			if (d.type === '门架' && !mapStore.isAddLine) {
				callback({ type: 'clac', data: { nodes: activePoint.nodes } })
			}
		} else {
			// 结束点必须是收费站时才显示“出”的标志,如果是门架可以继续点，将所点的点的id保存
			activePoint.nodes.push({ id: d.id, type: d.type })
			if (d.type !== '门架') {
				activePoint.endActive = true
				d3.select('#end')
					.attr('style', '')
					.attr('transform', 'translate(' + d.coordinates[0] + ',' + d.coordinates[1] + ')')
			}
			// 当前操作"添加路线"未被激活时
			if (mapStore.isAddLine) {
				const nodes = activePoint.nodes
				if (nodes.length >= 2 && nodes[0].type === '收费站' && nodes[nodes.length - 1].type === '收费站') {
					callback({ type: 'addLine', data: { startNodeId: nodes[0].id, endNodeId: nodes[nodes.length - 1].id } })
				} else {
					clearActivePoint()
					ElMessage.warning('开始节点和结束节点应为收费站')
				}
			} else {
				// 当前操作"添加路线"未被激活时
				callback({ type: 'clac', data: { nodes: activePoint.nodes } })
			}
		}
	}
	// 收费站事件
	d3.selectAll('.poClick').on('click', function (d: any) {
		if (timer.value) {
			clearTimeout(timer.value)
			timer.value = null
		}
		timer.value = setTimeout(() => {
			commonClick(d)
		}, 300)
	})
	// 门架事件
	d3.selectAll('.gantry')
		.on('dblclick', function (d: any) {
			if (timer.value) {
				clearTimeout(timer.value)
				timer.value = null
			}
			stopPropagationEvent()
			timer.value = setTimeout(() => {
				callback({ type: 'gantryDblclick', data: { id: d.id } })
			}, 300)
		})
		.on('click', function (d: any) {
			if (timer.value) {
				clearTimeout(timer.value)
				timer.value = null
			}
			timer.value = setTimeout(() => {
				commonClick(d)
			}, 300)
		})
		.on('mouseover', function (d: any) {
			// 线条颜色改变（判断是为了防止影响路径计算出的路线颜色）
			const lineEl = d3.select('#line' + d.lineId)
			if (lineEl.attr('stroke-width') === '1') {
				lineEl.attr('stroke', '#8de3fd')
			}
			// 信息框显示
			d3.select('#text1').text(d.name)
			d3.select('#text2').text(d.markcode).attr('style', '')
			d3.select('#text4').text(d.roadName)
			d3.select('#text5').text(d.companyName)
			d3.select('#svginfo')
				.attr('style', '')
				.attr('translateX', d.coordinates[0])
				.attr('translateY', d.coordinates[1])
				.attr(
					'transform',
					'translate(' +
						d.coordinates[0] +
						' ' +
						(d.coordinates[1] - 169 * infoZoom.value) +
						') scale(' +
						1.3 * infoZoom.value +
						')'
				)
		})
		.on('mouseout', function (d: any) {
			// 线条颜色恢复（判断是为了防止影响路径计算出的路线颜色）
			const lineEl = d3.select('#line' + d.lineId)
			if (lineEl.attr('stroke-width') === '1') {
				const color = lineEl.attr('color')
				lineEl.attr('stroke', color)
			}
			// 信息框隐藏
			d3.select('#text2').attr('style', 'display:none')
			d3.select('#svginfo').attr('style', 'display:none')
		})
	// 所有点事件
	d3.selectAll('.poEve')
		.on('dblclick', function (d: any) {
			if (timer.value) {
				clearTimeout(timer.value)
				timer.value = null
			}
			stopPropagationEvent()
			callback({ type: 'pointDblclick', data: { id: d.id } })
		})
		.on('mouseover', function (d: any) {
			d3.select('#text1').text(d.name || '')
			d3.select('#text4').text(d.roadName || '')
			d3.select('#text5').text(d.companyName || '')
			d3.select('#svginfo')
				.attr('style', '')
				.attr('translateX', d.coordinates[0])
				.attr('translateY', d.coordinates[1])
				.attr(
					'transform',
					'translate(' +
						d.coordinates[0] +
						' ' +
						(d.coordinates[1] - 169 * infoZoom.value) +
						') scale(' +
						1.3 * infoZoom.value +
						')'
				)
		})
		.on('mouseout', function () {
			d3.select('#svginfo').attr('style', 'display:none')
		})
	return clearActivePoint
}
// 给线添加事件
export function addLineEvent(callback: (arg: any) => void, infoZoom: Ref<number>) {
	//给线添加双击事件
	d3.selectAll('.linesg').on('dblclick', function (d: any) {
		if (timer.value) {
			clearTimeout(timer.value)
			timer.value = null
		}
		stopPropagationEvent()
		timer.value = setTimeout(() => {
			callback({ type: 'editLine', data: { id: d[0].id } })
		}, 300)
	})
	d3.selectAll('.lineitem')
		.on('mouseover', function (d: any) {
			// 线条颜色改变（判断是为了防止影响路径计算出的路线颜色）
			const lineEl = d3.select('#line' + d.id)
			if (lineEl.attr('stroke-width') === '1') {
				lineEl.attr('stroke', '#8de3fd')
			}
			// 信息框显示
			const x = (d.startLonLat[0] + d.endLonLat[0]) / 2
			const y = (d.startLonLat[1] + d.endLonLat[1]) / 2
			d3.select('#text1').text(d.startNodeName + ' 至 ' + d.endNodeName)
			d3.select('#text2')
				.text(d.distance + 'm')
				.attr('style', '')
			d3.select('#text4').text(d.roadName)
			d3.select('#text5').text(d.companyName)
			d3.select('#svginfo')
				.attr('style', '')
				.attr('translateX', x)
				.attr('translateY', y)
				.attr('transform', 'translate(' + x + ' ' + (y - 169 * infoZoom.value) + ') scale(' + 1.3 * infoZoom.value + ')')
			// .attr('transform', 'translate(' + x + ' ' + (y - 250 * infoZoom.value) + ') scale(' + 1.5 * infoZoom.value + ')')
		})
		.on('mouseout', function (d: any) {
			// 线条颜色恢复（判断是为了防止影响路径计算出的路线颜色）
			const lineEl = d3.select('#line' + d.id)
			if (lineEl.attr('stroke-width') === '1') {
				lineEl.attr('stroke', d.color)
			}
			// 信息框隐藏
			d3.select('#text2').attr('style', 'display:none')
			d3.select('#svginfo').attr('style', 'display:none')
		})
}
