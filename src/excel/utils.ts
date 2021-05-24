import { cell } from './config'

export interface CellEndpoint {
  sequence: {
    row: number
    col: number
  }
  position: {
    top: number
    left: number
  }
}

// 根据鼠标事件获取端点
export const getCellEndpoint = (event: MouseEvent, top: boolean = true): CellEndpoint => {
  const { offsetX, offsetY } = event

  const row = Math.floor(offsetX / cell.width) + Number(!top)
  const col = Math.floor(offsetY / cell.height) + Number(!top)

  return {
    sequence: {
      row,
      col
    },
    position: {
      top: col * cell.height,
      left: row * cell.width
    }
  }
}
