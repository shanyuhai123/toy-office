import { debounce, getColumnCharByIdx, removePx } from '@/utils/common'
import { inject, nextTick, onBeforeUnmount, onMounted, onUnmounted, Ref, watch } from 'vue'
import { cell, theme } from '../config'
import { CanvasSize } from '../types'
import { getCellEndpoint } from '../utils'

// 初始化 event 图层
export const initEventLayer = (eventLayer: Ref<HTMLCanvasElement | null>, size: CanvasSize) => {
  // 选区功能由 鼠标按下 => 鼠标拖动 构成

  // 选区范围
  const updateCoordinate = inject('updateCoordinate') as Function
  const updateSelectedRange = inject('updateSelectedRange') as Function

  interface RectFrame {
    left: number
    top: number
    width: number
    height: number
  }

  let firstPosition: Pick<RectFrame, 'left' | 'top'> = {
    left: 0,
    top: 0
  }

  const handleDrawRect = (rect: RectFrame) => {
    const ctx = eventLayer.value?.getContext('2d')
    if (!ctx) return

    // 先清空画布
    ctx.clearRect(0, 0, size.width, size.height)
    // 再绘制
    ctx.strokeStyle = theme.color
    ctx.lineWidth = 2
    ctx.strokeRect(rect.left, rect.top, rect.width, rect.height)

    updateSelectedRange(rect.left, rect.top, rect.width, rect.height)
  }

  const handleMousemove = debounce(function (event: MouseEvent) {
    const { position } = getCellEndpoint(event, false)

    if (!firstPosition.top || !firstPosition.left) return
    handleDrawRect({
      left: firstPosition.left,
      top: firstPosition.top,
      width: position.left - firstPosition.left,
      height: position.top - firstPosition.top
    })
  }, 6)

  const handleMousedown = (event: MouseEvent) => {
    eventLayer.value?.addEventListener('mousemove', handleMousemove)

    const { position, sequence } = getCellEndpoint(event)

    firstPosition = position

    if (!sequence.row || !sequence.col) return

    updateCoordinate(getColumnCharByIdx(sequence.row - 1) + sequence.col)
    handleDrawRect({
      left: position.left,
      top: position.top,
      width: cell.width,
      height: cell.height
    })
  }

  const handleMouseup = (event: MouseEvent) => {
    eventLayer.value?.removeEventListener('mousemove', handleMousemove)

    firstPosition = {
      left: 0,
      top: 0
    }
  }

  onMounted(() => {
    eventLayer.value?.addEventListener('mousedown', handleMousedown)
    eventLayer.value?.addEventListener('mouseup', handleMouseup)
  })

  onUnmounted(() => {
    eventLayer.value?.removeEventListener('mousedown', handleMousedown)
    eventLayer.value?.removeEventListener('mouseup', handleMouseup)
  })

  // handle tools
  const handleCellMerge = () => {
    console.log('handle-cell-merge')
  }

  return {
    handleCellMerge
  }
}

// 初始化 content 图层
export const initContentLayer = (contentLayerContext: Ref<CanvasRenderingContext2D | null>, size: CanvasSize) => {
  watch(contentLayerContext, async (ctx) => {
    if (!ctx) return

    await nextTick()

    ctx.strokeStyle = '#DDDDDD'
    // 初始设置
    let columnIdx = 0 // 列序号
    let rowIdx = 0 // 行序号
    // 字体相关
    ctx.font = '20px serif'
    ctx.textBaseline = 'middle'
    ctx.textAlign = 'center'

    // 列循环
    while (size.width > cell.width * columnIdx) {
      const currentWidth = cell.width * columnIdx

      ctx.moveTo(currentWidth, 0)
      ctx.lineTo(currentWidth, size.height)
      ctx.stroke()

      // TODO：列文字待增强
      ctx.fillText(getColumnCharByIdx(columnIdx), currentWidth + cell.width * 1.5, cell.height / 2, cell.width)

      columnIdx++
    }

    // 行循环
    while (size.height > cell.height * rowIdx) {
      const currentHeight = cell.height * rowIdx

      ctx.moveTo(0, currentHeight)
      ctx.lineTo(size.width, currentHeight)
      ctx.stroke()

      ctx.fillText((rowIdx + 1).toString(), cell.width / 2, currentHeight + cell.height * 1.5, cell.width)

      rowIdx++
    }

    // 绘制小三角
    // 间隔
    const pad = 5
    ctx.strokeStyle = '#b2b2b2'
    ctx.beginPath()
    ctx.moveTo(cell.width - pad, cell.height - pad)
    ctx.lineTo(cell.width - pad, pad * 1.5)
    ctx.lineTo(pad * 3, cell.height - pad)
    ctx.fillStyle = '#b4b4b4'
    ctx.fill()
    ctx.closePath()
  })
}

export const initInputDOM = (inputDOM: Ref<HTMLInputElement | null>, ctx: Ref<CanvasRenderingContext2D | null>) => {
  // 处理 input 失去焦点
  // 1. 应当从视区中隐藏
  // 2. 将输入框的值绘制到 content 图层
  function handleInputBlur () {
    const dom = inputDOM.value

    if (!dom) return

    const { top, left } = dom.style

    // 隐藏
    dom.style.top = '-99999px'
    dom.style.left = '-99999px'

    // 绘制
    // 字体相关
    if (!ctx.value) return
    ctx.value.font = '20px serif'
    ctx.value.fillStyle = '#000'
    ctx.value.textBaseline = 'middle'
    ctx.value.textAlign = 'center'
    ctx.value.fillText(dom.value, removePx(left) + cell.width / 2, removePx(top) + cell.height / 2, cell.width)
    dom.value = ''

    console.log(dom.value)
  }

  // TODO: 缺乏取值操作

  onMounted(() => {
    inputDOM.value?.addEventListener('blur', handleInputBlur)
  })

  onBeforeUnmount(() => {
    inputDOM.value?.removeEventListener('blur', handleInputBlur)
  })
}
