import { EnglishChar } from '@/utils/common'
import { cell } from '../config'
import { CanvasSize } from '../types'

export const initEventLayer = (ctx: CanvasRenderingContext2D) => {
  // ctx.fillStyle = 'rgba(255,255,255,0)'
}

// 绘制边框
export const initContentLayer = async (ctx: CanvasRenderingContext2D, size: CanvasSize) => {
  if (!ctx) return

  const chars = EnglishChar()

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
    ctx.fillText(chars[columnIdx] || 'UN', currentWidth + cell.width * 1.5, cell.height / 2, cell.width)

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
}
