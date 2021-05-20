import { getColumnCharByIdx, removePx } from '@/utils/common'
import { nextTick, onBeforeUnmount, onMounted, Ref, watch } from 'vue'
import { cell } from '../config'
import { CanvasSize } from '../types'

// 初始化 event 图层
export const initEventLayer = (eventLayerContext: Ref<CanvasRenderingContext2D | null>) => {
  // ctx.fillStyle = 'rgba(255,255,255,0)'
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
    // contentLayerContext?.value.fillText(dom.value, removePx(top) + cell.width / 2, removePx(left) + cell.height / 2, cell.width)

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
