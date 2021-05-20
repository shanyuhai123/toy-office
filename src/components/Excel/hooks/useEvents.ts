import { getColumnCharByIdx } from '@/utils/common'
import { Ref, ref } from '@vue/reactivity'
import { nextTick, watch } from '@vue/runtime-core'
import { cell, theme } from '../config'
import { CanvasSize } from '../types'

export const useCanvasClick = (contentLayerContext: Ref<CanvasRenderingContext2D | null>, size: CanvasSize, emit: any) => {
  const handleCanvasClick = ref((...args: any) => { })

  watch(contentLayerContext, async (ctx) => {
    if (!ctx) return
    await nextTick()

    handleCanvasClick.value = (e: MouseEvent) => {
      const { offsetX, offsetY } = e

      // 判断落位于几行几列
      const column = Math.floor(offsetX / cell.width)
      const row = Math.floor(offsetY / cell.height)

      // TODO：选中首行首列时不触发高亮
      // 1. 后续可选择整行整列
      if (!column || !row) return
      emit('coordinate', getColumnCharByIdx(column - 1) + row)

      // 先清空画布
      ctx.clearRect(0, 0, size.width, size.height)

      // 再绘制
      ctx.strokeStyle = theme.color
      ctx.lineWidth = 2
      ctx.strokeRect(cell.width * column, cell.height * row, cell.width, cell.height)
    }
  })

  return {
    handleCanvasClick
  }
}

export const useCanvasDoubleClick = (contentLayerContext: Ref<CanvasRenderingContext2D | null>, size: CanvasSize) => {
  const handleCanvasDoubleClick = ref((...args: any) => { })
  const top = ref(-9999)
  const left = ref(-9999)

  watch(contentLayerContext, async (ctx) => {
    await nextTick()

    handleCanvasDoubleClick.value = (e: MouseEvent) => {
      const { offsetX, offsetY } = e

      // 判断落位于几行几列
      const column = Math.floor(offsetX / cell.width)
      const row = Math.floor(offsetY / cell.height)

      // TODO：选中首行首列时不触发高亮
      // 1. 后续可选择整行整列
      if (!column || !row) return

      top.value = cell.height * row
      left.value = cell.width * column

      console.log(top.value)
    }
  })

  return {
    top,
    left,
    handleCanvasDoubleClick
  }
}
